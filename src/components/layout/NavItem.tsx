'use client';
import Link from "next/link";
import { usePathname } from 'next/navigation';

interface navItemProps {
    href: string;
    icon: React.ReactNode;
    label: string;
    closeMenu?: () => void;
}

export default function navItem ({ href, icon, label, closeMenu }: navItemProps) {
    const pathname = usePathname();
    return (
        <Link href={href} className={`flex items-center gap-1 ${pathname === href ? 'text-white' : 'text-muted hover:text-white'}`} onClick={closeMenu}>
            {icon}
            <span>{label}</span>
        </Link>
    );
}