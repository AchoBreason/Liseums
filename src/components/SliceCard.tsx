"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

interface SliceCardProps {
    id: string;
    imageSrc: string;
    title?: string;
}

export default function SliceCard({ id, imageSrc, title = "Unknown Subject" }: SliceCardProps) {
    return (
        <Link href={`/slice/${id}`}>
            <motion.div
                layoutId={`slice-container-${id}`}
                className="group relative w-full h-[60vh] md:h-[70vh] min-h-[400px] overflow-hidden cursor-pointer"
                whileHover="hover"
            >
                {/* Background Image */}
                <motion.div
                    layoutId={`slice-image-${id}`}
                    className="absolute inset-0 w-full h-full"
                    variants={{
                        hover: { scale: 1.05 }
                    }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="absolute inset-0 bg-neutral-900/20 z-10 group-hover:bg-transparent transition-colors duration-500" />
                    <Image
                        src={imageSrc}
                        alt={`Slice ${id}`}
                        fill
                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                        priority
                    />
                </motion.div>

                {/* Minimal Overlay Info */}
                <motion.div
                    className="absolute bottom-8 left-8 z-20"
                    variants={{
                        hover: { y: -10, opacity: 1 }
                    }}
                    transition={{ duration: 0.4 }}
                >
                    <motion.h2
                        layoutId={`slice-number-${id}`}
                        className="text-white text-5xl md:text-7xl font-light tracking-tighter"
                    >
                        {id}
                    </motion.h2>
                    <motion.p
                        className="text-white/60 text-sm tracking-[0.2em] uppercase mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                        {title}
                    </motion.p>
                </motion.div>
            </motion.div>
        </Link>
    );
}
