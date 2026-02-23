"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
    return (
        <section className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 mt-12 mb-24">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="w-full max-w-4xl"
            >
                <h1 className="text-4xl md:text-[3.5rem] font-light tracking-[0.08em] leading-snug mb-8 text-foreground">
                    Beyond the social clock,<br className="md:hidden" />archive your truth.
                </h1>

                <p className="text-base md:text-lg text-foreground/70 max-w-2xl mx-auto leading-loose mb-12">
                    Life Slices Protocol.<br />
                    Here, we use a booklet, a video, a piece of music,<br className="hidden md:block" />
                    to encapsulate those undisciplined moments of life.
                </p>

                <motion.button
                    whileHover={{ scale: 1.02, backgroundColor: "#1a1a1a" }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-foreground text-background px-10 py-4 text-sm tracking-[0.15em] shadow-sm transition-all uppercase"
                >
                    Extract My Slice
                </motion.button>
            </motion.div>
        </section>
    );
}
