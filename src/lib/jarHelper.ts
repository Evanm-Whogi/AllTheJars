import axios from "axios";

// Determine the required Java version based on Minecraft version
export async function getJavaVersion(mcVersion: string | undefined): Promise<string | undefined> {
  if (!mcVersion) return undefined;

  // Extract numeric parts like "1.20.5"
  const match = mcVersion.match(/^(\d+)\.(\d+)(?:\.(\d+))?/);
  if (!match) return "Java 8"; // fallback

  const major = parseInt(match[1], 10);
  const minor = parseInt(match[2], 10);
  const patch = match[3] ? parseInt(match[3], 10) : 0;

  // Only handle Minecraft 1.x versions
  if (major !== 1) return "Java 8";

  if (minor >= 12 && minor <= 16) return "Java 8";
  if (minor === 17) return "Java 16";
  if (minor >= 18 && (minor < 20 || (minor === 20 && patch <= 4))) return "Java 17";
  if (minor > 20 || (minor === 20 && patch >= 5)) return "Java 21";

  // Anything below 1.12 → Java 8
  return "Java 8";
}

// Infer Minecraft version from modloader version strings
export async function inferMinecraftVersion(version: string): Promise<string> {
    const match = version.match(/^(\d+)\.(\d+)/);
    return match ? `1.${match[1]}.${match[2]}` : "unknown";
}

// Compare version strings numerically
export function compareVersionStrings(a: string, b: string) {
    return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
}

// Fetch with timeout
export async function fetchWithRetry(url: string, retries = 3, timeout = 10000) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await axios.get(url, { timeout });
      return res.data;
    } catch (err) {
      if (i === retries - 1) throw err; // rethrow on last attempt
      console.warn(`Retrying ${url} (${i + 1}/${retries})`);
    }
  }
}

export function getDaysAgo(date: any): any {
  const createdAt = date.date instanceof Date ? date.date : new Date(date.date);
  const now = new Date();

  const diffMs = now.getTime() - createdAt.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Last Updated Today";
  if (diffDays === 1) return "Last Updated 1 day ago";
  return `Last Updated ${diffDays} days ago`;
}