import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Check } from 'lucide-react';

export default function PricingPage() {
    return (
        <main className="min-h-screen bg-transparent text-foreground flex flex-col selection:bg-black/10">
            <Header theme="light" />

            <section className="flex-grow pt-40 pb-24 px-6 md:px-12 w-full max-w-5xl mx-auto flex flex-col items-center">

                <div className="text-center mb-24">
                    <h1 className="text-4xl md:text-6xl font-light tracking-tighter mb-6">Archive Access</h1>
                    <p className="text-foreground/60 tracking-widest uppercase text-sm">Choose your protocol level</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-0 w-full relative">
                    {/* Free Tier */}
                    <div className="border-[0.5px] border-foreground/20 p-12 md:p-16 flex flex-col">
                        <h2 className="text-xl tracking-widest uppercase font-medium mb-2">Guest</h2>
                        <div className="mb-8 flex items-end gap-2">
                            <span className="text-5xl font-light tracking-tighter">$0</span>
                            <span className="text-foreground/50 text-sm mb-2 uppercase tracking-widest">/ forever</span>
                        </div>
                        <p className="text-foreground/70 leading-relaxed mb-12 min-h-[60px]">
                            Access the fundamental slices of human archive.
                        </p>
                        <ul className="flex flex-col gap-6 mb-16 flex-grow">
                            <li className="flex items-start gap-4 text-sm tracking-wide">
                                <Check size={18} className="mt-0.5 text-foreground/50" />
                                <span>Browse all public poster archives</span>
                            </li>
                            <li className="flex items-start gap-4 text-sm tracking-wide">
                                <Check size={18} className="mt-0.5 text-foreground/50" />
                                <span>Watch unencrypted video records</span>
                            </li>
                            <li className="flex items-start gap-4 text-sm tracking-wide">
                                <Check size={18} className="mt-0.5 text-foreground/50" />
                                <span>Listen to audio tape extracts</span>
                            </li>
                        </ul>
                        <button className="w-full py-4 border-[0.5px] border-foreground/30 text-xs tracking-[0.2em] hover:bg-foreground/5 transition-colors uppercase">
                            Current Status
                        </button>
                    </div>

                    {/* Paid Tier */}
                    <div className="border-[0.5px] border-foreground/20 md:border-l-0 p-12 md:p-16 flex flex-col bg-foreground text-background relative">
                        {/* Best Value indicator */}
                        <div className="absolute top-0 right-12 md:right-16 -translate-y-1/2 bg-background text-foreground border-[0.5px] border-foreground/20 px-4 py-1 text-[10px] tracking-[0.3em] uppercase">
                            Best Value
                        </div>

                        <h2 className="text-xl tracking-widest uppercase font-medium mb-2">Archivist</h2>
                        <div className="mb-2 flex items-end gap-2">
                            <span className="text-5xl font-light tracking-tighter">$99.99</span>
                            <span className="text-background/50 text-sm mb-2 uppercase tracking-widest">/ AUD year</span>
                        </div>
                        <p className="text-background/50 text-xs tracking-widest uppercase mb-8">Or $9.99 AUD / month</p>

                        <p className="text-background/70 leading-relaxed mb-12 min-h-[60px]">
                            Unlock the deepest encrypted thoughts and AI avatars.
                        </p>
                        <ul className="flex flex-col gap-6 mb-16 flex-grow">
                            <li className="flex items-start gap-4 text-sm tracking-wide">
                                <Check size={18} className="mt-0.5" />
                                <span>All Guest Privileges</span>
                            </li>
                            <li className="flex items-start gap-4 text-sm tracking-wide">
                                <Check size={18} className="mt-0.5 text-white" />
                                <span>Read full biographic books & texts</span>
                            </li>
                            <li className="flex items-start gap-4 text-sm tracking-wide">
                                <Check size={18} className="mt-0.5 text-white" />
                                <span>Unlimited AI Digital Avatar interactions</span>
                            </li>
                        </ul>
                        <button className="w-full py-4 bg-background text-foreground text-xs tracking-[0.2em] hover:bg-background/90 transition-colors uppercase">
                            Upgrade Now
                        </button>
                    </div>
                </div>

            </section>

            <Footer />
        </main>
    );
}
