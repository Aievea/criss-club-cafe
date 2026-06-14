"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import {
  Plus, Trash2, Check, X, ImageIcon, Loader2,
  ArrowUp, ArrowDown, ToggleLeft, ToggleRight, Pencil,
} from "lucide-react";

import { getDJsAdmin, addDJ, updateDJ, deleteDJ, uploadDJPhoto } from "@/src/lib/supabase-admin";
import type { DJ } from "@/src/lib/supabase";

const ACCENT = "#ff3da3";

export default function AdminDJsPage() {
  const [djs, setDjs] = useState<DJ[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [newName, setNewName] = useState("");
  const [newSub, setNewSub] = useState("");

  const fetch = useCallback(async () => {
    setLoading(true);
    setDjs(await getDJsAdmin());
    setLoading(false);
  }, []);

  useEffect(() => { fetch(); }, [fetch]);

  async function handleAdd() {
    if (!newName.trim()) return;
    const maxOrder = Math.max(0, ...djs.map((d) => d.sort_order));
    await addDJ(newName.trim(), newSub.trim() || null, maxOrder + 1);
    setNewName(""); setNewSub(""); setAdding(false);
    fetch();
  }

  async function handleDelete(id: string) {
    if (!confirm("Ștergi DJ-ul?")) return;
    await deleteDJ(id);
    fetch();
  }

  async function handleToggle(dj: DJ) {
    await updateDJ(dj.id, { active: !dj.active });
    fetch();
  }

  async function handleMove(index: number, dir: -1 | 1) {
    const target = index + dir;
    if (target < 0 || target >= djs.length) return;
    const a = djs[index];
    const b = djs[target];
    await Promise.all([
      updateDJ(a.id, { sort_order: b.sort_order }),
      updateDJ(b.id, { sort_order: a.sort_order }),
    ]);
    fetch();
  }

  if (loading) return (
    <div className="flex items-center justify-center py-32">
      <div className="h-px w-24 animate-pulse" style={{ background: ACCENT }} />
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1
          className="font-display text-2xl font-semibold tracking-[-0.02em] text-[#f5f0e8]"
          style={{ fontFamily: "var(--font-cinzel)" }}
        >
          DJ-uri
        </h1>
        <button
          onClick={() => setAdding(true)}
          className="flex items-center gap-2 rounded-lg px-4 py-2 text-[11px] font-semibold tracking-[0.22em] uppercase text-white transition-all"
          style={{ background: ACCENT }}
        >
          <Plus className="h-3.5 w-3.5" /> DJ nou
        </button>
      </div>

      {adding && (
        <div className="flex flex-wrap items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-4">
          <input
            autoFocus
            placeholder="Nume (ex: David Șerban)"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            className="flex-1 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-[#f5f0e8] placeholder-white/25 outline-none focus:border-white/25"
          />
          <input
            placeholder="Sub-titlu (ex: DJ, & Formația)"
            value={newSub}
            onChange={(e) => setNewSub(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            className="flex-1 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-[#f5f0e8] placeholder-white/25 outline-none focus:border-white/25"
          />
          <button onClick={() => setAdding(false)} className="rounded-lg p-2 text-red-400 hover:bg-red-400/10">
            <X className="h-4 w-4" />
          </button>
          <button onClick={handleAdd} className="rounded-lg p-2 text-green-400 hover:bg-green-400/10">
            <Check className="h-4 w-4" />
          </button>
        </div>
      )}

      <div className="space-y-2">
        {djs.map((dj, i) => (
          <DJRow
            key={dj.id}
            dj={dj}
            onDelete={() => handleDelete(dj.id)}
            onToggle={() => handleToggle(dj)}
            onMoveUp={i > 0 ? () => handleMove(i, -1) : undefined}
            onMoveDown={i < djs.length - 1 ? () => handleMove(i, 1) : undefined}
            onRefresh={fetch}
          />
        ))}
        {djs.length === 0 && (
          <p className="py-16 text-center text-sm text-white/30">
            Niciun DJ adăugat. Creează primul cu butonul de sus.
          </p>
        )}
      </div>

    </div>
  );
}

function DJRow({
  dj, onDelete, onToggle, onMoveUp, onMoveDown, onRefresh,
}: {
  dj: DJ;
  onDelete: () => void;
  onToggle: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  onRefresh: () => void;
}) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(dj.name);
  const [sub, setSub] = useState(dj.sub ?? "");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  async function saveEdit() {
    await updateDJ(dj.id, { name: name.trim(), sub: sub.trim() || null });
    setEditing(false);
    onRefresh();
  }

  async function handlePhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setUploadError(null);
    const url = await uploadDJPhoto(file, dj.id);
    if (url) {
      await updateDJ(dj.id, { photo_url: url });
      onRefresh();
    } else {
      setUploadError("Upload eșuat");
    }
    setUploading(false);
    // reset input so same file can be re-selected
    e.target.value = "";
  }

  return (
    <div
      className={`flex items-center gap-3 rounded-xl border p-3 transition-all ${
        dj.active ? "border-white/10 bg-white/[0.03]" : "border-white/5 bg-white/[0.015] opacity-50"
      }`}
    >
      {/* Photo thumbnail — label triggers file picker natively */}
      <label
        className="relative h-14 w-10 shrink-0 cursor-pointer overflow-hidden rounded-lg bg-white/5"
        title="Schimbă poza"
      >
        {dj.photo_url ? (
          <Image src={dj.photo_url} alt={dj.name} fill className="object-cover object-top" sizes="40px" />
        ) : (
          <div className="flex h-full items-center justify-center">
            {uploading ? (
              <Loader2 className="h-4 w-4 animate-spin text-white/30" />
            ) : (
              <ImageIcon className="h-4 w-4 text-white/20" />
            )}
          </div>
        )}
        {uploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <Loader2 className="h-4 w-4 animate-spin text-white/70" />
          </div>
        )}
        <input type="file" accept="image/*" className="hidden" onChange={handlePhoto} />
      </label>
      {uploadError && (
        <span className="text-xs text-red-400">{uploadError}</span>
      )}

      {/* Name / edit */}
      {editing ? (
        <div className="flex flex-1 flex-wrap gap-2">
          <input
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && saveEdit()}
            className="flex-1 rounded-lg border border-white/10 bg-white/[0.06] px-2.5 py-1.5 text-sm text-[#f5f0e8] outline-none focus:border-[#ff3da3]/50"
            placeholder="Nume"
          />
          <input
            value={sub}
            onChange={(e) => setSub(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && saveEdit()}
            className="w-36 rounded-lg border border-white/10 bg-white/[0.06] px-2.5 py-1.5 text-sm text-[#f5f0e8] outline-none focus:border-[#ff3da3]/50"
            placeholder="Sub-titlu"
          />
          <button onClick={saveEdit} className="rounded-lg p-1.5 text-green-400 hover:bg-green-400/10">
            <Check className="h-4 w-4" />
          </button>
          <button onClick={() => { setEditing(false); setName(dj.name); setSub(dj.sub ?? ""); }}
            className="rounded-lg p-1.5 text-red-400 hover:bg-red-400/10">
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div className="flex-1 min-w-0">
          {dj.sub && (
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#ff3da3]/60">{dj.sub}</p>
          )}
          <p className="truncate text-sm font-semibold text-[#f5f0e8]">{dj.name}</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex shrink-0 items-center gap-1">
        <button onClick={onMoveUp} disabled={!onMoveUp} className="rounded p-1.5 text-white/30 hover:text-white/70 disabled:opacity-20">
          <ArrowUp className="h-3.5 w-3.5" />
        </button>
        <button onClick={onMoveDown} disabled={!onMoveDown} className="rounded p-1.5 text-white/30 hover:text-white/70 disabled:opacity-20">
          <ArrowDown className="h-3.5 w-3.5" />
        </button>
        {!editing && (
          <button onClick={() => setEditing(true)} className="rounded p-1.5 text-white/30 hover:text-white/70">
            <Pencil className="h-3.5 w-3.5" />
          </button>
        )}
        <button onClick={onToggle} className="rounded p-1.5 text-white/30 hover:text-white/70">
          {dj.active
            ? <ToggleRight className="h-4 w-4 text-[#ff3da3]" />
            : <ToggleLeft className="h-4 w-4" />}
        </button>
        <button onClick={onDelete} className="rounded p-1.5 text-white/30 hover:text-red-400">
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
