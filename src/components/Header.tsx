"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function Header() {
    return (
        <header className="w-full flex justify-between items-center py-8 px-6 md:px-12 max-w-7xl mx-auto">
            {/* Logo */}
            <div className="flex items-center gap-4">
                {/* CSS Logo: 极简未闭合矩形框 */}
                <div className="relative w-8 h-10 border-[1.5px] border-foreground/80 border-r-0 border-b-0">
                    <div className="absolute bottom-0 right-0 w-4 h-[1.5px] bg-foreground/80"></div>
                    <div className="absolute top-0 right-0 w-[1.5px] h-4 bg-foreground/80"></div>
                </div>
                <div className="flex flex-col">
                    <span className="text-sm font-medium tracking-widest text-foreground uppercase">Liseums</span>
                    <span className="text-xs tracking-[0.2em] text-foreground/60 uppercase">Protocol</span>
                </div>
            </div>

            {/* Ghost Button */}
            <motion.button
                whileHover={{ backgroundColor: "var(--color-gold)", borderColor: "transparent", color: "#ffffff", boxShadow: "0 4px 14px 0 rgba(212, 175, 55, 0.39)" }}
                className="px-6 py-2 border-[1px] border-foreground/20 text-sm tracking-widest text-foreground transition-all duration-300 uppercase relative overflow-hidden group"
            >
                <span className="relative z-10">Join Protocol</span>
            </motion.button>
        </header>
    );
}
