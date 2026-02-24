"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface HeaderProps {
    theme?: 'light' | 'dark';
}

export default function Header({ theme = 'light' }: HeaderProps) {
    const isDark = theme === 'dark';
    const textColor = isDark ? 'text-white' : 'text-foreground';
    const borderColor = isDark ? 'border-white' : 'border-foreground';
    const bgColor = isDark ? 'bg-white' : 'bg-foreground';
    const hoverTextColor = isDark ? 'hover:text-black' : 'hover:text-white';

    return (
        <header className={`absolute top-0 w-full z-50 flex justify-between items-center py-6 px-6 md:px-12 bg-transparent ${textColor}`}>
            {/* Logo -> Home */}
            <Link href="/" className="flex items-center gap-4 group">
                <div className={`relative w-8 h-10 border-[1.5px] ${borderColor}/80 border-r-0 border-b-0 group-hover:${borderColor} transition-colors duration-500`}>
                    <div className={`absolute bottom-0 right-0 w-4 h-[1.5px] ${bgColor}/80 group-hover:${bgColor} transition-colors duration-500`}></div>
                    <div className={`absolute top-0 right-0 w-[1.5px] h-4 ${bgColor}/80 group-hover:${bgColor} transition-colors duration-500`}></div>
                </div>
                <div className="flex flex-col">
                    <span className="text-sm font-medium tracking-widest uppercase">Liseums</span>
                    <span className="text-xs tracking-[0.2em] opacity-60 uppercase">Protocol</span>
                </div>
            </Link>

            {/* Navigation */}
            <nav className="flex items-center gap-8">
                <Link href="/pricing" className="text-sm tracking-widest uppercase opacity-70 hover:opacity-100 transition-opacity duration-300">
                    Pricing
                </Link>
                <motion.button
                    whileHover={{ backgroundColor: isDark ? "#fff" : "#111", color: isDark ? "#111" : "#fff" }}
                    className={`px-6 py-2 border-[1px] ${borderColor} text-sm tracking-widest transition-all duration-300 uppercase`}
                >
                    Login
                </motion.button>
            </nav>
        </header>
    );
}
