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
                    在社会时钟之外，<br className="md:hidden" />存档你的真实。
                </h1>

                <p className="text-base md:text-lg text-foreground/70 max-w-2xl mx-auto leading-loose mb-12">
                    Life Slices Protocol / 人生切片协议。<br />
                    在这里，我们用一本小册子、一段影像、一首音乐，<br className="hidden md:block" />
                    封装那些不被规训的生命瞬间。
                </p>

                <motion.button
                    whileHover={{ scale: 1.02, backgroundColor: "#1a1a1a" }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-foreground text-background px-10 py-4 text-sm tracking-[0.15em] shadow-sm transition-all"
                >
                    提取我的切片
                </motion.button>
            </motion.div>
        </section>
    );
}
