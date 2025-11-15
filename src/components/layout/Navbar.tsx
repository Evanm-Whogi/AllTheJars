"use client";
import { useState } from 'react';
import { HomeIcon, Bars4Icon, XMarkIcon, RectangleStackIcon, ServerStackIcon, DocumentMagnifyingGlassIcon } from '@heroicons/react/24/solid';
import NavItem from '@/components/layout/NavItem';
import Image from 'next/image';

export default function Navbar () {
    const [isOpen, setIsOpen] = useState(false);
    const closeMenu = () => setIsOpen(false);

    return (
        <nav id="header" className="navbar bg-foreground border-b border-borders">
            <div className="flex container items-center justify-between h-17 pt-2 mx-auto px-5 md:px-0">
               
               {/* Icon */}
                <a href="/" className="flex items-center text-white text-3xl z-50" onClick={() => setIsOpen(!isOpen)}>
                    <Image src="/images/logo.png" alt="Whogi World Logo" width={100} height={100} className="pr-2 py-1 align-middle" />
                </a>

                {/* Hamburgers Are good */}
                <button className="md:hidden text-white z-50" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <XMarkIcon className="size-8" /> : <Bars4Icon className="size-8" />}
                </button>

                {/* Desktop Nav */}
                <div className="hidden md:flex flex-row text-md text-muted">
                    <div className="flex space-x-0 md:space-x-4 text-md">
                        <NavItem href='/' icon={<HomeIcon className="size-5 inline" />} label='Home' />
                        <NavItem href='mailto:atj@chit.sh' icon={<RectangleStackIcon className="size-5 inline" />} label='Request Jar' />
                        <NavItem href='https://advinservers.com/' icon={<ServerStackIcon className="size-5 inline" />} label='Purchase a Server' />
                        <NavItem href='/apidoc' icon={<DocumentMagnifyingGlassIcon className="size-5 inline" />} label='Api Docs' />
                    </div>
                </div>
            </div>
                
            {/* Mobile Nav */}
            {isOpen && (
            <div className="md:hidden absolute top-0 w-full">
                <div className="bg-foreground w-full text-lg p-5 space-y-2 rounded-b-md pt-24"> 
                    <NavItem href='/' icon={<HomeIcon className="size-5 inline" />} label='Home' />
                    <NavItem href='mailto:atj@chit.sh' icon={<RectangleStackIcon className="size-5 inline" />} label='Request Jar' />
                    <NavItem href='https://advinservers.com/' icon={<ServerStackIcon className="size-5 inline" />} label='Purchase a Server' />
                    <NavItem href='/apidoc' icon={<DocumentMagnifyingGlassIcon className="size-5 inline" />} label='Api Docs' />
                </div>
            </div>
            )}

        </nav>
    );
};