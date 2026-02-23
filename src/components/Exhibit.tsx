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
                className="group relative border-[0.5px] border-foreground/10 p-8 md:p-14 bg-background hover:shadow-[0_15px_50px_-15px_rgba(0,0,0,0.06)] transition-all duration-700"
            >
                <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-16">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-light tracking-wide mb-6">样本 001 - 不用上班指南</h2>
                        <div className="flex flex-wrap gap-4">
                            {['数字游牧', '独立开发', '南半球生活'].map((tag) => (
                                <span key={tag} className="text-xs tracking-[0.15em] text-foreground/60 border-[0.5px] border-foreground/20 px-4 py-1.5">
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
                        “从布里斯班的阳光到终端里的代码，不用上班不是一种对劳动的拒绝，而是夺回时间主权的尝试。这是关于一套键盘、一台服务器和一种全新生活协议的记录。”
                    </p>
                </div>

                <div className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-foreground/50 rounded-full animate-pulse mr-4"></div>
                    <p className="text-xs text-foreground/50 tracking-[0.15em]">完整影像/文稿即将解密...</p>
                </div>
            </motion.div>
        </section>
    );
}
