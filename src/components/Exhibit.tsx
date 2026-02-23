"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export default function Exhibit() {
    return (
        <section className="w-full max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-24">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="group relative border-[0.5px] border-foreground/10 p-8 md:p-14 bg-background/40 backdrop-blur-md hover:shadow-[0_20px_60px_-15px_rgba(212,175,55,0.1)] transition-all duration-700 hover:border-gold/30 hover:bg-background/60 rounded-3xl"
            >
                <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-16">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-light tracking-wide mb-6">Sample 001 - The Anti-Work Guide</h2>
                        <div className="flex flex-wrap gap-4">
                            {['Digital Nomad', 'Indie Hacker', 'Southern Hemisphere'].map((tag) => (
                                <span key={tag} className="text-xs tracking-[0.15em] text-foreground/60 border-[0.5px] border-foreground/20 px-4 py-1.5 uppercase">
                                    [{tag}]
                                </span>
                            ))}
                        </div>
                    </div>
                    <motion.div
                        whileHover={{ scale: 1.1, rotate: 10 }}
                        className="hidden md:flex p-3 rounded-full border-[0.5px] border-transparent group-hover:border-foreground/10 transition-colors"
                    >
                        <ArrowUpRight className="w-6 h-6 text-foreground/30 group-hover:text-foreground transition-colors" strokeWidth={1} />
                    </motion.div>
                </div>

                <div className="pl-6 border-l-[1px] border-foreground/20 mb-12 py-2">
                    <p className="text-base md:text-lg text-foreground/70 font-light leading-loose">
                        "From the sunshine of Brisbane to the code in the terminal, not going to work is not a rejection of labor, but an attempt to reclaim time sovereignty. This is a record of a keyboard, a server, and a completely new protocol for living."
                    </p>
                </div>

                <div className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-foreground/50 rounded-full animate-pulse mr-4"></div>
                    <p className="text-xs text-foreground/50 tracking-[0.15em]">Full video / transcript to be decrypted...</p>
                </div>
            </motion.div>
        </section>
    );
}
