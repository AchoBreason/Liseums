"use client";
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function About() {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });
    const lineHeight = useTransform(scrollYProgress, [0.2, 0.8], ["0%", "100%"]);

    return (
        <section ref={containerRef} className="relative w-full max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32 border-t-[0.5px] border-foreground/10">
            {/* Narrative Progress Line */}
            <div className="absolute left-6 md:left-12 top-0 bottom-0 w-[1px] bg-foreground/5 hidden md:block">
                <motion.div style={{ height: lineHeight }} className="w-full bg-gold" />
            </div>

            <div className="flex flex-col md:flex-row gap-12 md:gap-24 items-start relative z-10 pl-0 md:pl-16">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="md:w-1/3"
                >
                    <span className="text-[7rem] md:text-[10rem] font-light text-foreground/[0.03] tracking-tighter leading-none select-none">
                        00
                    </span>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="md:w-2/3 pt-4 md:pt-16"
                >
                    <p className="text-lg md:text-xl text-foreground/80 leading-loose font-light hover:text-foreground transition-colors duration-500">
                        Humans are vessels composed of countless moments. When the system demands uniformity, we choose to use "slices" to permanently archive those microscopic, intimate, and unconventional individual experiences.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
