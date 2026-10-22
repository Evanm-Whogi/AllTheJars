# Install dependencies only when needed
FROM node:24.22.1-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci --no-audit --no-fund

# Rebuild the source code only when needed
FROM node:24.22.1-alpine AS builder
WORKDIR /app

ARG NEXT_PUBLIC_NAME
ENV NEXT_PUBLIC_NAME=$NEXT_PUBLIC_NAME

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# Production image
FROM node:24.22.1-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY drizzle.config.ts ./drizzle.config.ts
COPY --from=builder /app/src ./src

EXPOSE 3000

CMD ["npm", "start"]
