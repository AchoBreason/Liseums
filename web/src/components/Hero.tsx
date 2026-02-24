"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
    return (
        <section className="relative min-h-[70vh] flex flex-col items-center justify-center text-center px-6 mt-12 mb-24 z-0">
            {/* Liquid Glass Background Effects */}
            <div className="absolute inset-0 pointer-events-none z-[-1] overflow-hidden flex items-center justify-center mask-image-[radial-gradient(ellipse_at_center,black,transparent_80%)]">
                <motion.div
                    animate={{ scale: [1, 1.1, 1], rotate: [0, 90, 0], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] bg-foreground/5 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] blur-3xl mix-blend-multiply origin-center -translate-x-1/4 -translate-y-1/4"
                />
                <motion.div
                    animate={{ scale: [1, 1.2, 1], rotate: [0, -90, 0], opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute w-[50vw] h-[50vw] max-w-[500px] max-h-[500px] bg-gold/10 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] blur-3xl mix-blend-multiply origin-center translate-x-1/4 translate-y-1/4"
                />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="w-full max-w-4xl backdrop-blur-sm bg-background/30 p-8 rounded-3xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.02)]"
            >
                <h1 className="text-4xl md:text-[3.5rem] font-light tracking-[0.08em] leading-snug mb-8 text-foreground drop-shadow-sm">
                    Beyond the social clock,<br className="md:hidden" />archive your truth.
                </h1>

                <p className="text-base md:text-lg text-foreground/70 max-w-2xl mx-auto leading-loose mb-12 mix-blend-darken">
                    Life Slices Protocol.<br />
                    Here, we use a booklet, a video, a piece of music,<br className="hidden md:block" />
                    to encapsulate those undisciplined moments of life.
                </p>

                <motion.button
                    whileHover={{ scale: 1.02, backgroundColor: "var(--color-gold)", color: "#ffffff", boxShadow: "0 10px 25px -5px rgba(212, 175, 55, 0.3)" }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-foreground text-background px-10 py-4 text-sm tracking-[0.15em] shadow-sm transition-all duration-300 uppercase relative overflow-hidden group"
                >
                    <span className="relative z-10">Extract My Slice</span>
                </motion.button>
            </motion.div>
        </section>
    );
}
