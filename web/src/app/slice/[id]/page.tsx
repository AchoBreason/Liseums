"use client";
import React, { use } from 'react';
import { motion } from 'framer-motion';
import { Play, Music, BookOpen, Bot, Lock } from 'lucide-react';
import Header from "@/components/Header";
import Image from 'next/image';

const mockData: Record<string, { title: string, quote: string, imageSrc: string }> = {
    "001": {
        title: "The Anti-Work Guide",
        quote: "From the sunshine of Brisbane to the code in the terminal, not going to work is not a rejection of labor, but an attempt to reclaim time sovereignty.",
        imageSrc: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2670&auto=format&fit=crop"
    },
    "002": {
        title: "Midnight Coder",
        quote: "The silence of 3 AM is the only compiler that truly understands my chaotic logic.",
        imageSrc: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2670&auto=format&fit=crop"
    },
    "003": {
        title: "Urban Escape",
        quote: "Concrete valleys build walls around our minds. Escaping them is the first protocol of freedom.",
        imageSrc: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=2670&auto=format&fit=crop"
    }
};

export default function SliceDetail({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const data = mockData[id] || mockData["001"];

    return (
        <main className="relative w-full h-screen overflow-hidden bg-black text-white selection:bg-white/20">
            <Header theme="dark" />

            {/* Immersive Background */}
            <motion.div
                layoutId={`slice-image-${id}`}
                className="absolute inset-0 w-full h-full z-0"
            >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40 z-10" />
                <Image
                    src={data.imageSrc}
                    alt={`Slice ${id}`}
                    fill
                    className="object-cover"
                    priority
                />
            </motion.div>

            {/* Content Area */}
            <div className="absolute inset-x-0 bottom-0 z-20 p-6 md:p-16 flex flex-col md:flex-row justify-between items-end gap-12">

                {/* Left Typography Box */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="max-w-3xl"
                >
                    <motion.h1
                        layoutId={`slice-number-${id}`}
                        className="text-6xl md:text-9xl font-light tracking-tighter mb-6"
                    >
                        {id}
                    </motion.h1>
                    <div className="border-l-[1px] border-white/30 pl-6 py-2">
                        <p className="text-lg md:text-2xl font-light leading-relaxed text-white/90">
                            "{data.quote}"
                        </p>
                    </div>
                </motion.div>

                {/* Right Floating Action Buttons (FABs) */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7, duration: 0.8 }}
                    className="flex flex-col gap-4"
                >
                    <ActionButton icon={<Play size={20} />} label="Video Record" isLocked={false} />
                    <ActionButton icon={<Music size={20} />} label="Audio Tape" isLocked={false} />
                    <ActionButton icon={<BookOpen size={20} />} label="Archived Book" isLocked={true} />
                    <ActionButton icon={<Bot size={20} />} label="AI Avatar Chat" isLocked={true} />
                </motion.div>

            </div>
        </main>
    );
}

function ActionButton({ icon, label, isLocked }: { icon: React.ReactNode, label: string, isLocked: boolean }) {
    return (
        <motion.button
            whileHover={{ x: -10, backgroundColor: "rgba(255,255,255,0.1)" }}
            className="flex items-center justify-between w-64 px-6 py-4 bg-black/40 backdrop-blur-md border-[0.5px] border-white/20 group transition-all"
        >
            <div className="flex items-center gap-4 text-white/80 group-hover:text-white transition-colors">
                {icon}
                <span className="text-sm tracking-widest uppercase">{label}</span>
            </div>
            {isLocked && <Lock size={14} className="text-white/40 group-hover:text-white/80" />}
        </motion.button>
    );
}
