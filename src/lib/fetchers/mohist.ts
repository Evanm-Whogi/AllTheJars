import { jarType } from "@/types/global";
import { getJavaVersion, fetchWithRetry } from "@/lib/jarHelper";

export async function fetchMohist(): Promise<jarType[]> {
    const manifest = await fetchWithRetry("https://api.mohistmc.com/project/mohist/versions", 30000);
    
    const versions = await Promise.all(
        manifest.map(async (v: any) => {
            let buildsJson = await fetchWithRetry(`https://api.mohistmc.com/project/mohist/${v.name}/builds`, 30000);

            const latestBuild = buildsJson[0];
            if(!latestBuild) return null; // missing build file

            return {
                type: "mohist",
                category: "mohist",
                name: `mohist - ${v.name} - ${latestBuild.id}`,
                version: v.name,
                releaseTime: new Date(latestBuild.build_date),
                javaVersion: await getJavaVersion(v.name),
                jar: `https://api.mohistmc.com/project/mohist/${v.name}/builds/${latestBuild.id}/download`
            };
        })
    );


    return versions.filter((v): v is jarType => Boolean(v));
}