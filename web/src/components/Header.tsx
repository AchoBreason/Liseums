"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

interface HeaderProps {
  theme?: "light" | "dark";
}

export default function Header({ theme = "light" }: HeaderProps) {
  const isDark = theme === "dark";
  const textColor = isDark ? "text-white" : "text-foreground";
  const borderColor = isDark ? "border-white" : "border-foreground";
  const bgColor = isDark ? "bg-white" : "bg-foreground";

  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    const adminEmails = (process.env.NEXT_PUBLIC_ADMIN_EMAILS ?? "")
      .split(",")
      .map((e) => e.trim().toLowerCase());

    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      setIsAdmin(adminEmails.includes(user?.email?.toLowerCase() ?? ""));
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setIsAdmin(
        adminEmails.includes(session?.user?.email?.toLowerCase() ?? "")
      );
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  return (
    <header
      className={`absolute top-0 w-full z-50 flex justify-between items-center py-6 px-6 md:px-12 bg-transparent ${textColor}`}
    >
      {/* Logo -> Home */}
      <Link href="/" className="flex items-center gap-4 group">
        <div
          className={`relative w-8 h-10 border-[1.5px] ${borderColor}/80 border-r-0 border-b-0 group-hover:${borderColor} transition-colors duration-500`}
        >
          <div
            className={`absolute bottom-0 right-0 w-4 h-[1.5px] ${bgColor}/80 group-hover:${bgColor} transition-colors duration-500`}
          ></div>
          <div
            className={`absolute top-0 right-0 w-[1.5px] h-4 ${bgColor}/80 group-hover:${bgColor} transition-colors duration-500`}
          ></div>
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-medium tracking-widest uppercase">
            Liseums
          </span>
          <span className="text-xs tracking-[0.2em] opacity-60 uppercase">
            Protocol
          </span>
        </div>
      </Link>

      {/* Navigation */}
      <nav className="flex items-center gap-8">
        <Link
          href="/pricing"
          className="text-sm tracking-widest uppercase opacity-70 hover:opacity-100 transition-opacity duration-300"
        >
          Pricing
        </Link>

        {user ? (
          <div className="flex items-center gap-6">
            {isAdmin && (
              <Link
                href="/admin"
                className="text-sm tracking-widest uppercase opacity-70 hover:opacity-100 transition-opacity duration-300"
              >
                Dashboard
              </Link>
            )}
            <motion.button
              whileHover={{
                backgroundColor: isDark ? "#fff" : "#111",
                color: isDark ? "#111" : "#fff",
              }}
              onClick={handleLogout}
              className={`px-6 py-2 border-[1px] ${borderColor} text-sm tracking-widest transition-all duration-300 uppercase`}
            >
              Logout
            </motion.button>
          </div>
        ) : (
          <Link href="/login">
            <motion.button
              whileHover={{
                backgroundColor: isDark ? "#fff" : "#111",
                color: isDark ? "#111" : "#fff",
              }}
              className={`px-6 py-2 border-[1px] ${borderColor} text-sm tracking-widest transition-all duration-300 uppercase`}
            >
              Login
            </motion.button>
          </Link>
        )}
      </nav>
    </header>
  );
}
