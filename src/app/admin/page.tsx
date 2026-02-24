"use client";
import React from 'react';
import Header from "@/components/Header";
import { Upload, Plus, Settings2 } from 'lucide-react';

export default function AdminDashboard() {
    return (
        <main className="min-h-screen bg-transparent text-foreground flex flex-col selection:bg-black/10">
            <Header theme="light" />

            <section className="flex-grow pt-40 pb-24 px-6 md:px-12 w-full max-w-4xl mx-auto flex flex-col">

                <div className="flex justify-between items-end mb-24 border-b-[0.5px] border-foreground/20 pb-8">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-light tracking-tighter mb-4">Registry</h1>
                        <p className="text-foreground/60 tracking-widest uppercase text-xs">Protocol Configuration Panel</p>
                    </div>
                    <button className="flex items-center gap-2 text-xs tracking-[0.15em] hover:text-foreground/60 transition-colors uppercase">
                        <Plus size={16} />
                        <span>New Slice</span>
                    </button>
                </div>

                {/* Form Area Empty State / Create New */}
                <div className="flex flex-col gap-12">

                    {/* Basic Info */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="md:col-span-1">
                            <h3 className="text-xs tracking-widest uppercase text-foreground/50">Core</h3>
                        </div>
                        <div className="md:col-span-3 flex flex-col gap-8">
                            <div className="flex flex-col gap-2">
                                <label className="text-xs tracking-widest uppercase">Slice Designation (ID)</label>
                                <input type="text" placeholder="e.g. 004" className="w-full bg-transparent border-b-[0.5px] border-foreground/20 py-2 focus:outline-none focus:border-foreground transition-colors font-light text-lg" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-xs tracking-widest uppercase">Subject Title</label>
                                <input type="text" placeholder="e.g. The Quiet Architect" className="w-full bg-transparent border-b-[0.5px] border-foreground/20 py-2 focus:outline-none focus:border-foreground transition-colors font-light text-lg" />
                            </div>
                        </div>
                    </div>

                    {/* Media */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="md:col-span-1">
                            <h3 className="text-xs tracking-widest uppercase text-foreground/50">Assets</h3>
                        </div>
                        <div className="md:col-span-3 flex flex-col gap-8">
                            <div className="flex flex-col gap-2">
                                <label className="text-xs tracking-widest uppercase mb-2">Primary Poster</label>
                                <button className="w-full h-32 border-[0.5px] border-dashed border-foreground/30 flex flex-col items-center justify-center gap-2 hover:bg-foreground/5 transition-colors text-foreground/50 hover:text-foreground">
                                    <Upload size={20} />
                                    <span className="text-xs tracking-widest uppercase">Upload Image</span>
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs tracking-widest uppercase">Video Record URL</label>
                                    <input type="text" placeholder="https://..." className="w-full bg-transparent border-b-[0.5px] border-foreground/20 py-2 focus:outline-none focus:border-foreground transition-colors font-light text-sm" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs tracking-widest uppercase">Audio Tape URL</label>
                                    <input type="text" placeholder="https://..." className="w-full bg-transparent border-b-[0.5px] border-foreground/20 py-2 focus:outline-none focus:border-foreground transition-colors font-light text-sm" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs tracking-widest uppercase">Archived Book URL</label>
                                    <input type="text" placeholder="https://..." className="w-full bg-transparent border-b-[0.5px] border-foreground/20 py-2 focus:outline-none focus:border-foreground transition-colors font-light text-sm" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* AI Configuration */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pt-4">
                        <div className="md:col-span-1">
                            <h3 className="text-xs tracking-widest uppercase text-foreground/50">Protocol Setup</h3>
                        </div>
                        <div className="md:col-span-3 flex flex-col gap-8">
                            <div className="flex flex-col gap-2">
                                <label className="text-xs tracking-widest uppercase flex items-center gap-2">
                                    <Settings2 size={14} />
                                    AI Knowledge Base ID
                                </label>
                                <input type="text" placeholder="LLM Vector Store ID..." className="w-full bg-transparent border-b-[0.5px] border-foreground/20 py-2 focus:outline-none focus:border-foreground transition-colors font-light text-lg" />
                                <p className="text-xs text-foreground/40 mt-2">Links this slice to the corresponding training weights for the Avatar Chat.</p>
                            </div>

                            <button className="w-full py-6 mt-8 bg-foreground text-background text-xs tracking-[0.2em] hover:bg-black/80 transition-colors uppercase">
                                Initialize Slice
                            </button>
                        </div>
                    </div>

                </div>
            </section>
        </main>
    );
}
