import { jarType } from "@/types/global";
import { getJavaVersion, fetchWithRetry } from "@/lib/jarHelper";

export async function fetchPaper(): Promise<jarType[]> {
    const manifest = await fetchWithRetry("https://fill.papermc.io/v3/projects/paper/versions", 30000);

    const versions = await Promise.all(
        manifest.versions.map(async (v: any) => {
            let buildsJson = await fetchWithRetry(`https://fill.papermc.io/v3/projects/paper/versions/${v.version.id}/builds/latest`, 30000);
            const id = buildsJson.downloads["server:default"].name.replace(".jar", "");

            return {
                type: buildsJson.channel,
                category: "paper",
                name: id,
                version: id.split("-")[1],
                releaseTime: new Date(buildsJson?.commits[0]?.time || null),
                javaVersion: await getJavaVersion(`${id.split("-")[1]}`),
                jar: buildsJson.downloads["server:default"].url
            };
        })
    );

    return versions;
}