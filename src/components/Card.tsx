import { CalendarIcon, ArrowTrendingUpIcon } from '@heroicons/react/24/solid';
import { incrementDownloads } from '@/lib/actions';
import { useState, useEffect } from 'react';
import { getDaysAgo } from '@/lib/jarHelper';
import { jarType } from '@/types/global';

// Tag Colors
const typeColors: Record<string, string> = {
  release: 'bg-green-800',
  snapshot: 'bg-yellow-600',
  alpha: 'bg-pink-600',
  beta: 'bg-blue-600',
  purpur: 'bg-purple-600',
  mohist: 'bg-rose-600',
  bungeecord: 'bg-teal-600',
  forge: 'bg-indigo-600',
  fabric: 'bg-fuchsia-600',
};

function getTypeColor(type: string): string {
  return typeColors[type.toLowerCase()] ?? 'bg-gray-600';
}

export default function Card({id, name, type, category, version, releaseTime, javaVersion, downloads, jar, createdAt, updatedAt}: jarType) {
    const [downloadCount, setDownloadCount] = useState(downloads);    
    const date = releaseTime || createdAt;

    const handleDownload = async () => {
        setDownloadCount((prev) => prev + 1);
        try {
            await incrementDownloads(id as any);
        } catch (err) {
            console.error('Failed to increment downloads', err);
            setDownloadCount((prev) => prev - 1);
        }
    };

    // Animations
    const updateCursor = ({ x, y }: any) => {
        document.documentElement.style.setProperty('--x', x)
        document.documentElement.style.setProperty('--y', y)
    }

    useEffect(() => {
        document.body.addEventListener('pointermove', updateCursor);
        return () => {
            document.body.removeEventListener('pointermove', updateCursor);
        };
    }, []);
    return (

        <div className="p-4 group overflow-hidden shadow-2xl bg-foreground rounded-md cardAnim">
            <div className="space-y-3">
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <h3 className="text-2xl font-bold text-white mb-1 capitalize">{name}</h3>
                        <span className={`inline-flex items-center rounded-full border text-white border-borders px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 capitalize ${getTypeColor(type)}`}>
                            {type}
                        </span>
                    
                        {/* Official pill for official minecraft jars */}
                        {['release', 'snapshot'].includes(type.toLowerCase()) && (
                            <span className="ml-1 inline-flex items-center rounded-full border border-borders px-2.5 py-0.5 text-xs bg-green-800 font-semibold capitalize">
                                Official
                            </span>
                        )}
                    </div>
                    <div className="flex flex-col items-end gap-1 shrink-0">
                        <span className={`inline-flex items-center rounded-full border border-background px-2.5 py-0.5 text-xs  font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2`}>
                            {javaVersion}
                        </span>
                    </div>
                </div>
                <div className="flex items-center text-sm text-muted space-x-2">
                    <CalendarIcon className="size-5" />
                    <span>{getDaysAgo({date})}</span>
                </div>
                <div className="flex items-center text-sm text-muted space-x-2">
                    <ArrowTrendingUpIcon className="size-5" />
                    <span>{downloadCount} Downloads</span>
                </div>
                <a href={jar} aria-label={`Download ${name}`} data-tianji-event={`downloaded-${name}`} 
                    className="block text-center w-full bg-green-600 hover:bg-green-700 rounded-md group-hover:scale-105 transition-transform cursor-pointer" 
                    onClick={handleDownload}>
                    Download
                </a>
            </div>
        </div>
    )
}