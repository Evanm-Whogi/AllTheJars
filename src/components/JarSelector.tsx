'use client';
import React, {useState, useEffect} from 'react';
import { getJars } from '@/lib/actions';
import { jarType } from '@/types/global';
import Card from '@/components/Card';

// Category - Description
const categories: Record<string, string> = {
  vanilla: "The official, unmodified version of Minecraft released by Mojang. It's the baseline experience, stable and widely supported.",
  paper: "A high-performance fork of Spigot, optimized for speed and configurability. Popular for large multiplayer servers.",
  purpur: "A fork of Paper that adds extra gameplay tweaks and customization options, while keeping Paper's performance benefits.",
  bungeecord: "A proxy system that links multiple Minecraft servers together, enabling seamless cross-server play.",
  velocity: "A modern, lightweight proxy alternative to BungeeCord, designed for speed, scalability, and plugin flexibility.",
  mohist: "A hybrid server software that combines Forge mods with Bukkit/Spigot plugins, bridging the modded and plugin worlds.",
  forge: "The classic modding platform for Minecraft Java Edition, enabling deep gameplay changes through community-created mods.",
  fabric: "A lightweight, fast modding toolchain focused on modularity and quick updates. Known for its simplicity and flexibility.",
  neoforge: "A modern fork of Forge, aiming to streamline mod development and improve compatibility with newer Minecraft versions.",
  bedrock: "The cross-platform edition of Minecraft, running on consoles, mobile, and Windows. Supports add-ons and realms, but differs from Java in modding.",
  snapshot: "Snapshots are experimental versions of Minecraft released weekly by Mojang. They include new features, bug fixes, and changes not yet available in the stable release. Snapshots may be unstable or contain bugs."
};

export default function JarSelector({initialVersions}: {initialVersions: any[]}) {
    const [selectedCategory, setSelectedCategory] = useState<string>('vanilla');
    const [versions, setVersions] = useState<jarType[]>(initialVersions);
    const [categoryCache, setCategoryCache] = useState<Record<string, jarType[]>>({
        vanilla: initialVersions,
    });

  // Client-side caching
  useEffect(() => {
    if (categoryCache[selectedCategory]) {
      setVersions(categoryCache[selectedCategory]);
    } else {
      getJars(selectedCategory)
        .then((data) => {
          setCategoryCache((prev) => ({ ...prev, [selectedCategory]: data }));
          setVersions(data);
        })
        .catch((err) => {
          console.error(`Error fetching jars for ${selectedCategory}:`, err);
          setVersions([]);
        });
    }
  }, [selectedCategory, categoryCache]);

    return (
        <div className="container mx-auto">
            <div className="flex flex-col space-y-6">
                {/* Jar Selector */}
                <div className="grid grid-cols-2 md:grid-cols-11 gap-3 px-5 md:px-0 place-content-center">
                    {Object.keys(categories).map((option) => (
                        <button key={option} 
                            className={`px-4 py-2 rounded-xl font-bold hover:cursor-pointer transition-colors hover:text-muted ${selectedCategory === option ? 'bg-accent/25' : 'bg-foreground'} capitalize`}
                            onClick={() => setSelectedCategory(option)} aria-pressed={selectedCategory === option}>
                            {option}
                        </button>
                    ))}
                </div> 

                {/* Jar Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-6 px-4 md:px-0">
                    <div className="p-4 bg-foreground rounded-xl text-white text-center col-span-full">
                        <h1 className="font-bold text-2xl capitalize">{selectedCategory}</h1>
                        <p className="text-sm text-muted mt-2">
                        {categories[selectedCategory] ?? 'No description available.'}
                        </p>
                    </div>

                    {versions.length === 0 ? (
                        <p className="text-center col-span-full text-muted">No versions found.</p>
                    ) : (
                        versions.map((version) => <Card key={version.id} {...version} />)
                    )}
                </div>
            </div>
        </div>
    )
}