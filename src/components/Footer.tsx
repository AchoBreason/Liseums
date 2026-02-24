import React from 'react';

export default function Footer() {
    return (
        <footer className="w-full border-t-[0.5px] border-white/10 mt-12 bg-black text-white">
            <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-10 flex flex-col md:flex-row justify-between items-center gap-6">
                <p className="text-xs text-white/40 tracking-[0.15em] uppercase">
                    © 2026 Liseums Protocol. All Rights Reserved.
                </p>

                <div className="flex gap-8">
                    <a href="#" className="text-xs text-white/40 hover:text-white transition-colors tracking-[0.15em] uppercase">X (Twitter)</a>
                    <a href="#" className="text-xs text-white/40 hover:text-white transition-colors tracking-[0.15em] uppercase">Instagram</a>
                    <a href="#" className="text-xs text-white/40 hover:text-white transition-colors tracking-[0.15em] uppercase">LinkedIn</a>
                </div>
            </div>
        </footer>
    );
}
