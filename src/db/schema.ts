import { pgTable, serial, text, timestamp, varchar, integer, uniqueIndex } from "drizzle-orm/pg-core";

export const jars = pgTable("jars", {
    id: serial("id").primaryKey(),
    type: text("type").notNull(),
    category: text("category").notNull(),
    name: text("name").notNull(),
    version: text("version").notNull(),
    releaseTime: timestamp("release_time"),
    javaVersion: text("java_version").notNull(),
    jar: text("jar").notNull(),
    downloads: integer("downloads").notNull().default(0),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
}, (table) => ({
  nameUnique: uniqueIndex("jars_name_unique").on(table.name), // onConflictDoNothing
}));
