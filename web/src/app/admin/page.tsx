"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import Header from "@/components/Header";
import {
  Upload,
  Plus,
  Settings2,
  Loader2,
  CheckCircle2,
  AlertCircle,
  X,
  Trash2,
  ChevronRight,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import Image from "next/image";

interface SliceForm {
  designation: string;
  title: string;
  quote: string;
  video_url: string;
  audio_url: string;
  book_url: string;
  ai_knowledge_base_id: string;
}

interface SliceRecord extends SliceForm {
  id: string;
  poster_url: string | null;
  created_at: string;
}

const emptyForm: SliceForm = {
  designation: "",
  title: "",
  quote: "",
  video_url: "",
  audio_url: "",
  book_url: "",
  ai_knowledge_base_id: "",
};

export default function AdminDashboard() {
  const supabase = createClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState<SliceForm>(emptyForm);
  const [posterFile, setPosterFile] = useState<File | null>(null);
  const [posterPreview, setPosterPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [slices, setSlices] = useState<SliceRecord[]>([]);
  const [loadingSlices, setLoadingSlices] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [posterRemoved, setPosterRemoved] = useState(false);

  const loadSlices = useCallback(async () => {
    setLoadingSlices(true);
    const { data, error } = await supabase
      .from("slices")
      .select("*")
      .order("designation", { ascending: true });
    if (!error && data) {
      setSlices(data);
    }
    setLoadingSlices(false);
  }, [supabase]);

  // Load existing slices
  useEffect(() => {
    loadSlices();
  }, [loadSlices]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPosterFile(file);
    setPosterPreview(URL.createObjectURL(file));
    setPosterRemoved(false);
  };

  const clearPoster = () => {
    setPosterFile(null);
    setPosterPreview(null);
    setPosterRemoved(true);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const deletePosterFromStorage = async (url: string) => {
    try {
      // url roughly looks like: https://[project].supabase.co/storage/v1/object/public/slice-posters/[filename]
      const parts = url.split("/");
      const fileName = parts[parts.length - 1];
      if (!fileName) return;
      await supabase.storage.from("slice-posters").remove([fileName]);
    } catch (err) {
      console.error("Failed to delete old poster", err);
    }
  };

  const uploadPoster = async (file: File): Promise<string> => {
    const ext = file.name.split(".").pop();
    const fileName = `${form.designation}-${Date.now()}.${ext}`;

    const { error } = await supabase.storage
      .from("slice-posters")
      .upload(fileName, file, { upsert: true });

    if (error) throw new Error(`Upload failed: ${error.message}`);

    const {
      data: { publicUrl },
    } = supabase.storage.from("slice-posters").getPublicUrl(fileName);

    return publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      let poster_url: string | null = null;

      if (editingId) {
        // Find existing slice to check for old poster
        const existingSlice = slices.find((s) => s.id === editingId);

        // Upload poster if a new file is selected
        if (posterFile) {
          poster_url = await uploadPoster(posterFile);
          // Delete old poster if exists
          if (existingSlice?.poster_url) {
            await deletePosterFromStorage(existingSlice.poster_url);
          }
        }

        // Update existing slice
        const updateData: Record<string, unknown> = {
          designation: form.designation,
          title: form.title,
          quote: form.quote || null,
          video_url: form.video_url || null,
          audio_url: form.audio_url || null,
          book_url: form.book_url || null,
          ai_knowledge_base_id: form.ai_knowledge_base_id || null,
          updated_at: new Date().toISOString(),
        };

        if (poster_url) {
          updateData.poster_url = poster_url;
        } else if (posterRemoved) {
          updateData.poster_url = null;
          // Delete old poster if user explicitly removed it without uploading a new one
          if (existingSlice?.poster_url) {
            await deletePosterFromStorage(existingSlice.poster_url);
          }
        }

        const { error } = await supabase
          .from("slices")
          .update(updateData)
          .eq("id", editingId);

        if (error) throw error;
        setMessage({ type: "success", text: "Slice updated successfully." });
      } else {
        // Create new slice
        // Upload poster if a new file is selected
        if (posterFile) {
          poster_url = await uploadPoster(posterFile);
        }

        const { error } = await supabase.from("slices").insert({
          designation: form.designation,
          title: form.title,
          quote: form.quote || null,
          poster_url,
          video_url: form.video_url || null,
          audio_url: form.audio_url || null,
          book_url: form.book_url || null,
          ai_knowledge_base_id: form.ai_knowledge_base_id || null,
          created_by: user.id,
        });

        if (error) throw error;
        setMessage({
          type: "success",
          text: "Slice initialized successfully.",
        });
      }

      // Reset form and reload
      resetForm();
      await loadSlices();
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "An unexpected error occurred";
      setMessage({ type: "error", text: msg });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm(emptyForm);
    clearPoster();
    setPosterRemoved(false);
    setEditingId(null);
  };

  const editSlice = (slice: SliceRecord) => {
    setEditingId(slice.id);
    setForm({
      designation: slice.designation,
      title: slice.title,
      quote: slice.quote || "",
      video_url: slice.video_url || "",
      audio_url: slice.audio_url || "",
      book_url: slice.book_url || "",
      ai_knowledge_base_id: slice.ai_knowledge_base_id || "",
    });
    setPosterPreview(slice.poster_url);
    setPosterFile(null);
    setPosterRemoved(false);
    setMessage(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteSlice = async (id: string) => {
    if (!confirm("Delete this slice permanently?")) return;

    // Find the slice to check for a poster
    const sliceToDelete = slices.find((s) => s.id === id);
    if (sliceToDelete?.poster_url) {
      await deletePosterFromStorage(sliceToDelete.poster_url);
    }

    const { error } = await supabase.from("slices").delete().eq("id", id);
    if (error) {
      setMessage({ type: "error", text: error.message });
    } else {
      if (editingId === id) resetForm();
      await loadSlices();
      setMessage({ type: "success", text: "Slice deleted." });
    }
  };

  const updateField = (field: keyof SliceForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <main className="min-h-screen bg-transparent text-foreground flex flex-col selection:bg-black/10">
      <Header theme="light" />

      <section className="flex-grow pt-40 pb-24 px-6 md:px-12 w-full max-w-4xl mx-auto flex flex-col">
        <div className="flex justify-between items-end mb-24 border-b-[0.5px] border-foreground/20 pb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-light tracking-tighter mb-4">
              Registry
            </h1>
            <p className="text-foreground/60 tracking-widest uppercase text-xs">
              Protocol Configuration Panel
            </p>
          </div>
          {editingId && (
            <button
              onClick={resetForm}
              className="flex items-center gap-2 text-xs tracking-[0.15em] hover:text-foreground/60 transition-colors uppercase"
            >
              <Plus size={16} />
              <span>New Slice</span>
            </button>
          )}
        </div>

        {/* Message */}
        {message && (
          <div
            className={`mb-12 flex items-start gap-3 p-4 border-[0.5px] ${message.type === "success"
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

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-12">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <h3 className="text-xs tracking-widest uppercase text-foreground/50">
                Core
              </h3>
            </div>
            <div className="md:col-span-3 flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                <label className="text-xs tracking-widest uppercase">
                  Slice Designation (ID)
                </label>
                <input
                  type="text"
                  placeholder="e.g. 004"
                  required
                  value={form.designation}
                  onChange={(e) => updateField("designation", e.target.value)}
                  className="w-full bg-transparent border-b-[0.5px] border-foreground/20 py-2 focus:outline-none focus:border-foreground transition-colors font-light text-lg"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs tracking-widest uppercase">
                  Subject Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. The Quiet Architect"
                  required
                  value={form.title}
                  onChange={(e) => updateField("title", e.target.value)}
                  className="w-full bg-transparent border-b-[0.5px] border-foreground/20 py-2 focus:outline-none focus:border-foreground transition-colors font-light text-lg"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs tracking-widest uppercase">
                  Quote / Description
                </label>
                <textarea
                  placeholder="A defining quote or description for this slice..."
                  value={form.quote}
                  onChange={(e) => updateField("quote", e.target.value)}
                  rows={3}
                  className="w-full bg-transparent border-b-[0.5px] border-foreground/20 py-2 focus:outline-none focus:border-foreground transition-colors font-light text-sm resize-none"
                />
              </div>
            </div>
          </div>

          {/* Media */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <h3 className="text-xs tracking-widest uppercase text-foreground/50">
                Assets
              </h3>
            </div>
            <div className="md:col-span-3 flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                <label className="text-xs tracking-widest uppercase mb-2">
                  Primary Poster
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                {posterPreview ? (
                  <div className="relative w-full h-48 border-[0.5px] border-foreground/10 overflow-hidden group">
                    <Image
                      src={posterPreview}
                      alt="Poster preview"
                      fill
                      className="object-cover"
                    />
                    <button
                      type="button"
                      onClick={clearPoster}
                      className="absolute top-2 right-2 p-1.5 bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full h-32 border-[0.5px] border-dashed border-foreground/30 flex flex-col items-center justify-center gap-2 hover:bg-foreground/5 transition-colors text-foreground/50 hover:text-foreground"
                  >
                    <Upload size={20} />
                    <span className="text-xs tracking-widest uppercase">
                      Upload Image
                    </span>
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
                <div className="flex flex-col gap-2">
                  <label className="text-xs tracking-widest uppercase">
                    Video Record URL
                  </label>
                  <input
                    type="text"
                    placeholder="https://..."
                    value={form.video_url}
                    onChange={(e) => updateField("video_url", e.target.value)}
                    className="w-full bg-transparent border-b-[0.5px] border-foreground/20 py-2 focus:outline-none focus:border-foreground transition-colors font-light text-sm"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs tracking-widest uppercase">
                    Audio Tape URL
                  </label>
                  <input
                    type="text"
                    placeholder="https://..."
                    value={form.audio_url}
                    onChange={(e) => updateField("audio_url", e.target.value)}
                    className="w-full bg-transparent border-b-[0.5px] border-foreground/20 py-2 focus:outline-none focus:border-foreground transition-colors font-light text-sm"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs tracking-widest uppercase">
                    Archived Book URL
                  </label>
                  <input
                    type="text"
                    placeholder="https://..."
                    value={form.book_url}
                    onChange={(e) => updateField("book_url", e.target.value)}
                    className="w-full bg-transparent border-b-[0.5px] border-foreground/20 py-2 focus:outline-none focus:border-foreground transition-colors font-light text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* AI Configuration */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pt-4">
            <div className="md:col-span-1">
              <h3 className="text-xs tracking-widest uppercase text-foreground/50">
                Protocol Setup
              </h3>
            </div>
            <div className="md:col-span-3 flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                <label className="text-xs tracking-widest uppercase flex items-center gap-2">
                  <Settings2 size={14} />
                  AI Knowledge Base ID
                </label>
                <input
                  type="text"
                  placeholder="LLM Vector Store ID..."
                  value={form.ai_knowledge_base_id}
                  onChange={(e) =>
                    updateField("ai_knowledge_base_id", e.target.value)
                  }
                  className="w-full bg-transparent border-b-[0.5px] border-foreground/20 py-2 focus:outline-none focus:border-foreground transition-colors font-light text-lg"
                />
                <p className="text-xs text-foreground/40 mt-2">
                  Links this slice to the corresponding training weights for the
                  Avatar Chat.
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-6 mt-8 bg-foreground text-background text-xs tracking-[0.2em] hover:bg-black/80 transition-colors uppercase disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {loading && <Loader2 size={16} className="animate-spin" />}
                {loading
                  ? "Processing..."
                  : editingId
                    ? "Update Slice"
                    : "Initialize Slice"}
              </button>
            </div>
          </div>
        </form>

        {/* Existing Slices List */}
        <div className="mt-32 border-t-[0.5px] border-foreground/20 pt-12">
          <h2 className="text-xs tracking-widest uppercase text-foreground/50 mb-8">
            Existing Slices
          </h2>

          {loadingSlices ? (
            <div className="flex items-center gap-3 text-foreground/40 py-8">
              <Loader2 size={16} className="animate-spin" />
              <span className="text-xs tracking-widest uppercase">
                Loading...
              </span>
            </div>
          ) : slices.length === 0 ? (
            <p className="text-foreground/30 text-sm">
              No slices in the registry yet.
            </p>
          ) : (
            <div className="flex flex-col">
              {slices.map((slice) => (
                <div
                  key={slice.id}
                  className="flex items-center justify-between py-6 border-b-[0.5px] border-foreground/10 group"
                >
                  <button
                    onClick={() => editSlice(slice)}
                    className="flex items-center gap-6 flex-1 text-left"
                  >
                    <span className="text-2xl font-light tracking-tighter w-16">
                      {slice.designation}
                    </span>
                    <div className="flex flex-col">
                      <span className="text-sm font-light">
                        {slice.title}
                      </span>
                      <span className="text-xs text-foreground/40 mt-1">
                        {new Date(slice.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <ChevronRight
                      size={14}
                      className="ml-auto opacity-0 group-hover:opacity-50 transition-opacity"
                    />
                  </button>
                  <button
                    onClick={() => deleteSlice(slice.id)}
                    className="p-2 ml-4 opacity-0 group-hover:opacity-40 hover:!opacity-100 transition-opacity text-red-600"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
