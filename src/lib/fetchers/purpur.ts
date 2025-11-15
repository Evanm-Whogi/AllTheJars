import { jarType } from "@/types/global";
import { getJavaVersion, fetchWithRetry } from "@/lib/jarHelper";

export async function fetchPurpur(): Promise<jarType[]> {
    const manifest = await fetchWithRetry("https://api.purpurmc.org/v2/purpur", 30000);

    const versions = await Promise.all(
        manifest.versions.map(async (v: any) => {
            let buildsJson = await fetchWithRetry(`https://api.purpurmc.org/v2/purpur/${v}`, 30000);
            let releaseTime = await fetchWithRetry(`https://api.purpurmc.org/v2/purpur/${v}/${buildsJson.builds.latest}`)

            return {
                type: "purpur",
                category: "purpur",
                name: `${buildsJson.project} - ${buildsJson.version}`,
                version: buildsJson.version,
                releaseTime: new Date(releaseTime.timestamp),
                javaVersion: await getJavaVersion(buildsJson.version),
                jar: `https://api.purpurmc.org/v2/purpur/${buildsJson.version}/${buildsJson.builds.latest}/download`
            };
        })
    );

    return versions;
}