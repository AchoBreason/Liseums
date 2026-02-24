"use client";
import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowRight } from 'lucide-react';

export default function LoginPage() {
    return (
        <main className="min-h-screen bg-transparent text-foreground flex flex-col selection:bg-black/10">
            <Header theme="light" />

            <section className="flex-grow pt-40 pb-24 px-6 md:px-12 w-full max-w-lg mx-auto flex flex-col justify-center">

                <div className="mb-16">
                    <h1 className="text-4xl md:text-5xl font-light tracking-tighter mb-4">Authentication</h1>
                    <p className="text-foreground/60 tracking-widest uppercase text-xs">Access your protocol identity</p>
                </div>

                <form className="flex flex-col gap-8" onSubmit={(e) => e.preventDefault()}>
                    <div className="flex flex-col gap-2">
                        <label className="text-xs tracking-widest uppercase text-foreground/50">Identifier</label>
                        <input
                            type="text"
                            placeholder="Email or Access Code"
                            className="w-full bg-transparent border-b-[0.5px] border-foreground/20 py-3 focus:outline-none focus:border-foreground transition-colors font-light text-lg"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-xs tracking-widest uppercase text-foreground/50">Passphrase</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full bg-transparent border-b-[0.5px] border-foreground/20 py-3 focus:outline-none focus:border-foreground transition-colors font-light text-lg"
                        />
                    </div>

                    <button className="group mt-4 flex items-center justify-between w-full py-5 border-[0.5px] border-foreground/30 hover:bg-foreground hover:text-background transition-colors px-6">
                        <span className="text-xs tracking-[0.2em] uppercase">Initialize Connection</span>
                        <ArrowRight size={18} className="opacity-50 group-hover:opacity-100 transition-opacity" />
                    </button>

                    <div className="flex justify-between items-center mt-4">
                        <button className="text-xs text-foreground/40 hover:text-foreground tracking-widest uppercase transition-colors">
                            Lost Passphrase?
                        </button>
                        <button className="text-xs text-foreground/40 hover:text-foreground tracking-widest uppercase transition-colors">
                            Request Access
                        </button>
                    </div>
                </form>

            </section>

            <Footer />
        </main>
    );
}
