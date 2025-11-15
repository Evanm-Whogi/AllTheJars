import { jarType } from "@/types/global";
import { getJavaVersion, inferMinecraftVersion, compareVersionStrings, fetchWithRetry } from "@/lib/jarHelper";


export async function fetchNeoforge(): Promise<jarType[]> {
  const res = await fetchWithRetry("https://maven.neoforged.net/releases/net/neoforged/neoforge/maven-metadata.xml", 30000);

  // Extract versions directly
  const versionMatches = [...res.matchAll(/<version>(.*?)<\/version>/g)].map(m => m[1]);
  if (!versionMatches.length) return [];

  // Filter stable versions
  const stableVersions = versionMatches.filter(v => !/(alpha|beta|rc)/i.test(v));

  // Group by inferred MC version (async safe)
  const grouped = new Map<string, string[]>();
  for (const version of stableVersions) {
    const mcVersion = await inferMinecraftVersion(version);
    if (!mcVersion) continue;
    const list = grouped.get(mcVersion) ?? [];
    list.push(version);
    grouped.set(mcVersion, list);
  }

  // Select latest per group
  const results: any[] = [];
  for (const [mcVersion, versions] of grouped.entries()) {
      
      versions.sort(compareVersionStrings);
      const latest = versions.at(-1)!;

      results.push({
          type: "neoforge",
          category: "neoforge",
          name: `Neoforge - ${mcVersion} - ${latest}`,
          version: latest,
          releaseTime: null,
          javaVersion: await getJavaVersion(mcVersion),
          jar: `https://maven.neoforged.net/releases/net/neoforged/neoforge/${latest}/neoforge-${latest}-installer.jar`
      });
  }

  results.sort((a: any, b: any) => compareVersionStrings(b.version, a.version));
  return results;
}