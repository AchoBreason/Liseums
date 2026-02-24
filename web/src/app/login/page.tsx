"use client";
import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowRight, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type AuthMode = "login" | "register" | "reset";

export default function LoginPage() {
  const [mode, setMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const supabase = createClient();

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    const adminEmails = (process.env.NEXT_PUBLIC_ADMIN_EMAILS ?? "")
      .split(",")
      .map((e) => e.trim().toLowerCase());
    const isAdmin = adminEmails.includes(
      data.user?.email?.toLowerCase() ?? ""
    );
    window.location.href = isAdmin ? "/admin" : "/";
  };

  const handleRegister = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) throw error;
    setMessage({
      type: "success",
      text: "Verification link sent. Check your inbox.",
    });
  };

  const handleReset = async () => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?next=/admin`,
    });
    if (error) throw error;
    setMessage({
      type: "success",
      text: "Recovery link sent. Check your inbox.",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      if (mode === "login") {
        await handleLogin();
      } else if (mode === "register") {
        await handleRegister();
      } else {
        await handleReset();
      }
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred";
      setMessage({ type: "error", text: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  const titles: Record<AuthMode, { heading: string; sub: string }> = {
    login: {
      heading: "Authentication",
      sub: "Access your protocol identity",
    },
    register: {
      heading: "Request Access",
      sub: "Initialize a new protocol identity",
    },
    reset: {
      heading: "Recovery",
      sub: "Reset your passphrase via email",
    },
  };

  const submitLabels: Record<AuthMode, string> = {
    login: "Initialize Connection",
    register: "Create Identity",
    reset: "Send Recovery Link",
  };

  return (
    <main className="min-h-screen bg-transparent text-foreground flex flex-col selection:bg-black/10">
      <Header theme="light" />

      <section className="flex-grow pt-40 pb-24 px-6 md:px-12 w-full max-w-lg mx-auto flex flex-col justify-center">
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-light tracking-tighter mb-4">
            {titles[mode].heading}
          </h1>
          <p className="text-foreground/60 tracking-widest uppercase text-xs">
            {titles[mode].sub}
          </p>
        </div>

        {message && (
          <div
            className={`mb-8 flex items-start gap-3 p-4 border-[0.5px] ${
              message.type === "success"
                ? "border-green-500/30 text-green-700"
                : "border-red-500/30 text-red-700"
            }`}
          >
            {message.type === "success" ? (
              <CheckCircle2 size={16} className="mt-0.5 shrink-0" />
            ) : (
              <AlertCircle size={16} className="mt-0.5 shrink-0" />
            )}
            <span className="text-xs tracking-wide leading-relaxed">
              {message.text}
            </span>
          </div>
        )}

        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label className="text-xs tracking-widest uppercase text-foreground/50">
              Identifier
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="w-full bg-transparent border-b-[0.5px] border-foreground/20 py-3 focus:outline-none focus:border-foreground transition-colors font-light text-lg"
            />
          </div>

          {mode !== "reset" && (
            <div className="flex flex-col gap-2">
              <label className="text-xs tracking-widest uppercase text-foreground/50">
                Passphrase
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={6}
                className="w-full bg-transparent border-b-[0.5px] border-foreground/20 py-3 focus:outline-none focus:border-foreground transition-colors font-light text-lg"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="group mt-4 flex items-center justify-between w-full py-5 border-[0.5px] border-foreground/30 hover:bg-foreground hover:text-background transition-colors px-6 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <span className="text-xs tracking-[0.2em] uppercase">
              {loading ? "Processing..." : submitLabels[mode]}
            </span>
            {loading ? (
              <Loader2 size={18} className="animate-spin opacity-50" />
            ) : (
              <ArrowRight
                size={18}
                className="opacity-50 group-hover:opacity-100 transition-opacity"
              />
            )}
          </button>

          <div className="flex justify-between items-center mt-4">
            {mode === "login" && (
              <>
                <button
                  type="button"
                  onClick={() => {
                    setMode("reset");
                    setMessage(null);
                  }}
                  className="text-xs text-foreground/40 hover:text-foreground tracking-widest uppercase transition-colors"
                >
                  Lost Passphrase?
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMode("register");
                    setMessage(null);
                  }}
                  className="text-xs text-foreground/40 hover:text-foreground tracking-widest uppercase transition-colors"
                >
                  Request Access
                </button>
              </>
            )}
            {mode !== "login" && (
              <button
                type="button"
                onClick={() => {
                  setMode("login");
                  setMessage(null);
                }}
                className="text-xs text-foreground/40 hover:text-foreground tracking-widest uppercase transition-colors"
              >
                Back to Login
              </button>
            )}
          </div>
        </form>
      </section>

      <Footer />
    </main>
  );
}
