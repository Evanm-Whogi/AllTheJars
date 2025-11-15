import { jarType } from "@/types/global";
import { getJavaVersion, fetchWithRetry } from "@/lib/jarHelper";

export async function fetchVanilla(): Promise<jarType[]> {
    const manifest = await fetchWithRetry("https://launchermeta.mojang.com/mc/game/version_manifest.json", 30000);

    const versions = await Promise.all(
        manifest.versions.map(async (v: any) => {
            try {
                const dJson = await fetchWithRetry(v.url, 30000);

                return {
                    type: v.type,
                    category: "vanilla",
                    name: `${v.type} - ${v.id}`,
                    version: v.id,
                    releaseTime: new Date(v.releaseTime),
                    javaVersion: await getJavaVersion(v.id),
                    jar: dJson.downloads?.server?.url || dJson.downloads?.client?.url, // Old versions only have client
                };
            } catch (error) {
                console.log(`Catch:`, v, error);
                return {};
            }
        })
    );

    return versions;
}