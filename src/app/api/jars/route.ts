export const runtime = "nodejs";

import { NextResponse, NextRequest } from "next/server";
import { getDb } from "@/db";
import { jars } from "@/db/schema";
import { jarType } from "@/types/global";
import { eq, desc } from "drizzle-orm";

export async function GET(req: NextRequest) {
  const db = getDb();
  
  try {
    const searchParams = req.nextUrl.searchParams;
    const category = searchParams.get("category");

    const result: jarType[] = await db
      .select()
      .from(jars)
      .where(category ? eq(jars.category, category) : undefined)
      .orderBy(desc(jars.releaseTime));

    return NextResponse.json({
      message: "success",
      count: result.length,
      jars: result,
    });
  } catch (error) {
    console.error("Error fetching jars:", error);
    return NextResponse.json(
      { message: "error fetching jars", error: String(error) },
      { status: 500 }
    );
  }
}
