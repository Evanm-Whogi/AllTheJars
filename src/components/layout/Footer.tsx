'use client';

export default function Footer() {
    return (
        <footer className="py-4 border-t bg-foreground border-borders w-full">
            <div className="flex flex-row px-6 mx-auto text-sm text-white place-content-between">
                <a href="https://chit.sh/" className="transition-colors hover:text-muted">
                    {process.env.NEXT_PUBLIC_NAME} © 2025 <span className="underline">chit.sh</span> All rights reserved.
                </a>
                <a href="https://github.com/whogitheraccoon" className="transition-colors hover:cursor-pointer hover:text-muted underline">Github</a> 
            </div>
        </footer>
    );
}