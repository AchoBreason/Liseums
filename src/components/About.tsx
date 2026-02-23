"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function About() {
    return (
        <section className="w-full max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32 border-t-[0.5px] border-foreground/10">
            <div className="flex flex-col md:flex-row gap-12 md:gap-24 items-start">
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
                    <p className="text-lg md:text-xl text-foreground/80 leading-loose font-light">
                        人是由无数个瞬间组成的容器。当系统要求我们整齐划一，我们选择用「切片」的方式，将那些微小的、私密的、打破常规的个体经验永久归档。
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
