import { jarType } from "@/types/global";
import { getJavaVersion, fetchWithRetry, compareVersionStrings } from "@/lib/jarHelper";

export async function fetchForge(): Promise<jarType[]> {
    const manifest = await fetchWithRetry("https://files.minecraftforge.net/net/minecraftforge/forge/maven-metadata.json", 30000);
    const versions: any = [];

    for (const [mcVersion, builds] of Object.entries(manifest)) {
        const buildsArr = builds as string[];
        if (buildsArr.length === 0) continue;

        // Grab the last build (latest)
        const latestBuild = buildsArr[buildsArr.length - 1];

        versions.push({
            type: "forge",
            category: "forge",
            name: `Forge - ${latestBuild}`,
            version: latestBuild.split("-")[0],
            releaseTime: null,
            javaVersion: await getJavaVersion(mcVersion),
            jar: `https://maven.minecraftforge.net/net/minecraftforge/forge/${latestBuild}/forge-${latestBuild}-installer.jar`,
        });
    }

    // Forge doesnt provide a releaseTime so instead we just compare and sort it (desc)
    versions.sort((a: any, b: any) => compareVersionStrings(b.version, a.version));
    return versions;
}