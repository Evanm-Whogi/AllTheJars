import { jarType } from "@/types/global";
import { getJavaVersion, fetchWithRetry } from "@/lib/jarHelper";

export async function fetchFabric(): Promise<jarType[]> {
  const manifest = await fetchWithRetry("https://meta.fabricmc.net/v2/versions/game", 30000);
  const manifestStable = manifest.filter((v: any) => v.stable === true);

  // Get latest loader version
  const manifestLoader = await fetchWithRetry("https://meta.fabricmc.net/v2/versions/loader", 30000);
  const latestLoader = manifestLoader[0].version;


  const versions: jarType[] = await Promise.all(
    manifestStable.map(async (v: any) => {
      const profile = await fetchWithRetry(`https://meta.fabricmc.net/v2/versions/loader/${v.version}/${latestLoader}/profile/json`, 30000);

      return {
        type: "fabric",
        category: "fabric",
        name: `Fabric - ${v.version} - ${latestLoader}`,
        version: v.version,
        releaseTime: new Date(profile.releaseTime) || null, 
        javaVersion: await getJavaVersion(v.version),
        jar: `https://meta.fabricmc.net/v2/versions/loader/${v.version}/${latestLoader}/1.1.0/server/jar`
      };
    })
  );

    return versions;
}