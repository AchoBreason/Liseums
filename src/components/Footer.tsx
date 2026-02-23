import React from 'react';

export default function Footer() {
    return (
        <footer className="w-full border-t-[0.5px] border-foreground/10 mt-12 md:mt-24">
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 flex flex-col md:flex-row justify-between items-center gap-6">
                <p className="text-xs text-foreground/40 tracking-[0.15em]">
                    © 2026 Liseums. All rights reserved.
                </p>

                <div className="flex gap-8">
                    <a href="#" className="text-xs text-foreground/40 hover:text-foreground transition-colors tracking-[0.15em]">TWITTER</a>
                    <a href="#" className="text-xs text-foreground/40 hover:text-foreground transition-colors tracking-[0.15em]">INSTAGRAM</a>
                    <a href="#" className="text-xs text-foreground/40 hover:text-foreground transition-colors tracking-[0.15em]">WECHAT</a>
                </div>
            </div>
        </footer>
    );
}
