export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { getDb } from "@/db";
import { jars } from "@/db/schema";
import { fetchVanilla } from "@/lib/fetchers/vanilla";
import { fetchPaper } from "@/lib/fetchers/paper";
import { fetchPurpur } from "@/lib/fetchers/purpur";
import { fetchMohist } from "@/lib/fetchers/mohist";
import { fetchForge } from "@/lib/fetchers/forge";
import { fetchFabric } from "@/lib/fetchers/fabric";
import { fetchNeoforge } from "@/lib/fetchers/neoforge";
import { jarType } from "@/types/global";

export async function GET(req: Request) {
  const db = getDb();

  // Require API-KEY
  const token = req.headers.get("x-api-key");
  if (token !== process.env.INTERNAL_API_KEY) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const existingJars = await db.select().from(jars);
    const existingKeys = new Set(existingJars.map(j => `${j.category}:${j.type}:${j.version}`));

    const fetchers = [
      fetchVanilla(),
      fetchPaper(),
      fetchPurpur(),
      fetchMohist(),
      fetchForge(),
      fetchFabric(),
      fetchNeoforge(),
    ];

    const results = await Promise.all(fetchers);
    const allFetched: jarType[] = results.flat();

    // Filter only jars not already in the DB
    const newJars = allFetched.filter(
      j => !existingKeys.has(`${j.category}:${j.type}:${j.version}`)
    );

    // Finally insert jars into the DB
    if (newJars.length > 0) {
      await db.insert(jars).values(newJars);
    }

    // Manually adding bungee and snapshot as we dont rely on third party apis
    const manualJars: jarType[] = [
      {
        type: "bungeecord",
        category: "bungeecord",
        name: "Bungeecord Latest Maven Build",
        version: "Latest",
        releaseTime: null,
        javaVersion: "Java 8",
        downloads: 0,
        jar: "https://ci.md-5.net/job/BungeeCord/lastSuccessfulBuild/artifact/bootstrap/target/BungeeCord.jar",
      },
      {
        type: "snapshot",
        category: "velocity",
        name: "Velocity Latest Snapshot",
        version: "Latest",
        releaseTime: null,
        javaVersion: "Java 8",
        downloads: 0,
        jar: "https://fill-data.papermc.io/v1/objects/40cae75987dd549e1dfd5170394166ddaeceb576f095935cf331f8f924278d5c/velocity-3.4.0-SNAPSHOT-557.jar",
      },
    ];
    await db.insert(jars).values(manualJars).onConflictDoNothing({ target: jars.name });

    return NextResponse.json({
      message: "success",
      added: newJars.length,
      jars: newJars,
    });
  } catch (error) {
    console.error("Error fetching jars:", error);
    return NextResponse.json(
      { message: "error fetching jars", error: String(error) },
      { status: 500 }
    );
  }
}
