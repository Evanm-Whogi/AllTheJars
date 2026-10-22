import type { Metadata } from "next";
import Script from "next/script";
import "@/styles/globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "AllTheJars - Your ultimate hub for Minecraft Jars",
  description: "AllTheJars is your ultimate hub for Minecraft downloads, providing direct-from-source access to every official and modded Minecraft jar file, ensuring authenticity and ease of access for all your server and client needs.",
  keywords: ["minecraft", "jars", "download", "vanilla", "snapshot", "paper", "purpur", "bungeecord", "velocity", "mohist", "forge", "fabric", "neoforge", "bedrock"],
  openGraph: {
    title: "AllTheJars - Your ultimate hub for Minecraft Jars",
    description: "AllTheJars is your ultimate hub for Minecraft downloads, providing direct-from-source access to every official and modded Minecraft jar file, ensuring authenticity and ease of access for all your server and client needs.",
    url: "https://atj.chit.sh/",
    siteName: "AllTheJars",
    images: [
      {
        url: "http://cdn.chit.sh/atj_logo.png",
        width: 1200,
        height: 630,
        alt: "AllTheJars"
      }
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AllTheJars",
    description: "AllTheJars is your ultimate hub for Minecraft downloads, providing direct-from-source access to every official and modded Minecraft jar file, ensuring authenticity and ease of access for all your server and client needs.",
    images: ["http://cdn.chit.sh/atj_logo.png"],
  },
  authors: [{ name: "Whogi" }],
}

export default function RootLayout({children}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <body className="bg-background text-white min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <Script src="https://tracking.chit.sh/api/script.js?siteId=ed35c75f2566" defer />
      </body>
    </html>
  );
}
