"use server";
import NodeCache from "node-cache";
import { getDb } from "@/db";
import { jars } from "@/db/schema";
import { jarType } from "@/types/global";
import { eq, and, sql, asc, desc } from "drizzle-orm";

const cache = new NodeCache({ stdTTL: 60 });

export async function getJars(category?: string): Promise<jarType[]> {
    const db = getDb();

    const cacheKey = category ?? "all";
    const cached = cache.get<jarType[]>(cacheKey);
    if (cached) return cached;

    try {
        // Create where Clause.
        const whereClause = (() => {
            if (!category) return undefined;
            if (category === "vanilla") return and(eq(jars.category, "vanilla"), eq(jars.type, "release"));
            if (category === "snapshot") return and(eq(jars.category, "vanilla"), eq(jars.type, "snapshot"));
            return eq(jars.category, category);
        })();

        const result: jarType[] = await db.select().from(jars).where(whereClause).orderBy(desc(jars.releaseTime))
        cache.set(cacheKey, result);
        return result;
    } catch (error) {
        console.error("Error fetching jars:", error);
        throw new Error("Failed to fetch jars");
    }
}

export async function incrementDownloads(versionId: number) {
    const db = getDb();
    
    try {
        await db.update(jars).set({ downloads: sql`${jars.downloads} + 1` }).where(eq(jars.id, versionId));
    } catch (error) {
        console.error(`Failed to increment downloads for version ${versionId}:`, error);
        throw new Error("Failed to increment downloads");
    }
}