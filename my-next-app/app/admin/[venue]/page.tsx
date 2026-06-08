"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import {
  Plus, Trash2, Pencil, Check, X, ChevronDown, ChevronUp,
  ToggleLeft, ToggleRight, ImageIcon, Loader2,
} from "lucide-react";
import {
  getAdminMenu, addCategory, updateCategory, deleteCategory,
  addItem, updateItem, toggleItem, deleteItem, uploadCategoryPhoto,
} from "@/src/lib/supabase-admin";
import type { Venue, CategoryWithItems, MenuItem } from "@/src/lib/supabase";

const ACCENT = { cafe: "#c9a86a", club: "#ff3da3" } as const;

export default function AdminVenuePage() {
  const { venue } = useParams<{ venue: string }>();
  const v = venue as Venue;
  const accent = ACCENT[v] ?? "#c9a86a";

  const [menu, setMenu] = useState<CategoryWithItems[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string[]>([]);
  const [newCatRo, setNewCatRo] = useState("");
  const [newCatEn, setNewCatEn] = useState("");
  const [addingCat, setAddingCat] = useState(false);

  const refresh = useCallback(async () => {
    setLoading(true);
    const data = await getAdminMenu(v);
    setMenu(data);
    setLoading(false);
  }, [v]);

  useEffect(() => { refresh(); }, [refresh]);

  function toggleExpanded(id: string) {
    setExpanded((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  async function handleAddCategory() {
    if (!newCatRo.trim()) return;
    const maxOrder = Math.max(0, ...menu.map((c) => c.sort_order));
    await addCategory(v, newCatRo.trim(), newCatEn.trim() || newCatRo.trim(), maxOrder + 1, null);
    setNewCatRo(""); setNewCatEn(""); setAddingCat(false);
    refresh();
  }

  async function handleDeleteCategory(id: string) {
    if (!confirm("Ștergi categoria și tot ce conține?")) return;
    await deleteCategory(id);
    refresh();
  }

  async function handleToggleItem(item: MenuItem) {
    await toggleItem(item.id, !item.available);
    refresh();
  }

  async function handleDeleteItem(id: string) {
    if (!confirm("Ștergi produsul?")) return;
    await deleteItem(id);
    refresh();
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="h-px w-24 animate-pulse" style={{ background: accent }} />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold tracking-[-0.02em] text-[#f5f0e8]"
            style={{ fontFamily: "var(--font-cinzel)" }}>
          {v === "cafe" ? "Criss Cafe" : "Criss Club"}
        </h1>
        <button
          onClick={() => setAddingCat(true)}
          className="flex items-center gap-2 rounded-lg px-4 py-2 text-[11px] font-semibold tracking-[0.22em] uppercase transition-all"
          style={{ background: accent, color: v === "cafe" ? "#1a1411" : "#fff" }}
        >
          <Plus className="h-3.5 w-3.5" /> Categorie nouă
        </button>
      </div>

      {addingCat && (
        <div className="flex flex-wrap items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-4">
          <input
            autoFocus
            placeholder="Nume RO"
            value={newCatRo}
            onChange={(e) => setNewCatRo(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddCategory()}
            className="flex-1 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-[#f5f0e8] placeholder-white/25 outline-none focus:border-white/25"
          />
          <input
            placeholder="Nume EN"
            value={newCatEn}
            onChange={(e) => setNewCatEn(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddCategory()}
            className="flex-1 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-[#f5f0e8] placeholder-white/25 outline-none focus:border-white/25"
          />
          <button onClick={handleAddCategory} className="rounded-lg p-2 text-green-400 hover:bg-green-400/10">
            <Check className="h-4 w-4" />
          </button>
          <button onClick={() => setAddingCat(false)} className="rounded-lg p-2 text-red-400 hover:bg-red-400/10">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {menu.map((cat) => (
        <CategoryBlock
          key={cat.id}
          cat={cat}
          accent={accent}
          venue={v}
          expanded={expanded.includes(cat.id)}
          onToggleExpand={() => toggleExpanded(cat.id)}
          onDeleteCategory={() => handleDeleteCategory(cat.id)}
          onToggleItem={handleToggleItem}
          onDeleteItem={handleDeleteItem}
          onRefresh={refresh}
          expandedSet={expanded}
          onToggleExpandSub={(id) => toggleExpanded(id)}
        />
      ))}
    </div>
  );
}

function CategoryBlock({
  cat, accent, venue, expanded, onToggleExpand, onDeleteCategory,
  onToggleItem, onDeleteItem, onRefresh, isSubcategory = false,
  expandedSet, onToggleExpandSub,
}: {
  cat: CategoryWithItems;
  accent: string;
  venue: Venue;
  expanded: boolean;
  onToggleExpand: () => void;
  onDeleteCategory: () => void;
  onToggleItem: (item: MenuItem) => void;
  onDeleteItem: (id: string) => void;
  onRefresh: () => void;
  isSubcategory?: boolean;
  expandedSet: string[];
  onToggleExpandSub: (id: string) => void;
}) {
  const [editingName, setEditingName] = useState(false);
  const [nameRo, setNameRo] = useState(cat.name_ro);
  const [nameEn, setNameEn] = useState(cat.name_en);
  const [addingItem, setAddingItem] = useState(false);
  const [addingSubcat, setAddingSubcat] = useState(false);
  const [newSubRo, setNewSubRo] = useState("");
  const [newSubEn, setNewSubEn] = useState("");
  const [uploading, setUploading] = useState(false);
  const photoInputRef = useRef<HTMLInputElement>(null);

  async function saveCategory() {
    await updateCategory(cat.id, { name_ro: nameRo, name_en: nameEn });
    setEditingName(false);
    onRefresh();
  }

  async function handlePhotoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const url = await uploadCategoryPhoto(file, cat.id);
    if (url) await updateCategory(cat.id, { photo_url: url });
    setUploading(false);
    onRefresh();
  }

  async function handleRemovePhoto() {
    await updateCategory(cat.id, { photo_url: null });
    onRefresh();
  }

  async function handleAddSubcategory() {
    if (!newSubRo.trim()) return;
    const maxOrder = Math.max(0, ...cat.subcategories.map((c) => c.sort_order));
    await addCategory(venue, newSubRo.trim(), newSubEn.trim() || newSubRo.trim(), maxOrder + 1, cat.id);
    setNewSubRo(""); setNewSubEn(""); setAddingSubcat(false);
    onRefresh();
  }

  const totalItems = cat.items.length + cat.subcategories.reduce((n, s) => n + s.items.length, 0);

  const isOpen = isSubcategory || expanded;

  return (
    <div className={`rounded-xl border overflow-hidden ${isSubcategory ? "border-white/5 bg-white/[0.015] ml-6" : "border-white/8 bg-white/[0.03]"}`}>
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-4">
        <button
          onClick={isSubcategory ? undefined : onToggleExpand}
          className={`flex-1 flex items-center gap-3 text-left min-w-0 ${isSubcategory ? "cursor-default" : ""}`}
        >
          {!isSubcategory && (expanded
            ? <ChevronUp className="h-4 w-4 shrink-0 text-white/30" />
            : <ChevronDown className="h-4 w-4 shrink-0 text-white/30" />
          )}
          {editingName ? (
            <div className="flex flex-1 flex-wrap items-center gap-2" onClick={(e) => e.stopPropagation()}>
              <input value={nameRo} onChange={(e) => setNameRo(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && saveCategory()}
                className="flex-1 rounded-lg border border-white/15 bg-white/[0.06] px-3 py-1.5 text-sm text-[#f5f0e8] outline-none min-w-[100px]" />
              <input value={nameEn} onChange={(e) => setNameEn(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && saveCategory()}
                className="flex-1 rounded-lg border border-white/15 bg-white/[0.06] px-3 py-1.5 text-sm text-[#f5f0e8] outline-none min-w-[100px]" />
              <button onClick={saveCategory} className="text-green-400 hover:text-green-300"><Check className="h-4 w-4" /></button>
              <button onClick={() => setEditingName(false)} className="text-red-400 hover:text-red-300"><X className="h-4 w-4" /></button>
            </div>
          ) : (
            <div className="flex min-w-0 flex-1 items-center gap-3">
              {/* Photo thumbnail */}
              {cat.photo_url && (
                <div className="relative h-8 w-12 shrink-0 overflow-hidden rounded">
                  <Image src={cat.photo_url} alt={cat.name_ro} fill className="object-cover" sizes="48px" />
                </div>
              )}
              <span className="truncate font-semibold text-[#f5f0e8]">
                {cat.name_ro}
                <span className="text-white/30"> / {cat.name_en}</span>
                <span className="ml-2 text-xs text-white/25">({totalItems})</span>
              </span>
            </div>
          )}
        </button>

        {!editingName && (
          <div className="flex shrink-0 items-center gap-1">
            {/* Photo upload */}
            <label className="relative cursor-pointer rounded-lg p-2 text-white/30 hover:text-white/70 transition-colors" title="Adaugă/schimbă poza">
              {uploading
                ? <Loader2 className="h-3.5 w-3.5 animate-spin" />
                : <ImageIcon className="h-3.5 w-3.5" />
              }
              <input
                ref={photoInputRef}
                type="file"
                accept="image/*"
                className="absolute inset-0 cursor-pointer opacity-0"
                onChange={handlePhotoUpload}
              />
            </label>
            {cat.photo_url && (
              <button onClick={handleRemovePhoto} className="rounded-lg p-2 text-white/20 hover:text-red-400 transition-colors" title="Elimină poza">
                <X className="h-3 w-3" />
              </button>
            )}
            <button onClick={() => setEditingName(true)} className="rounded-lg p-2 text-white/30 hover:text-white/70 transition-colors">
              <Pencil className="h-3.5 w-3.5" />
            </button>
            <button onClick={onDeleteCategory} className="rounded-lg p-2 text-white/30 hover:text-red-400 transition-colors">
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        )}
      </div>

      {isOpen && (
        <div className="border-t border-white/6 px-5 pb-5">
          {/* Items */}
          <div className="divide-y divide-white/5">
            {cat.items.map((item) => (
              <ItemRow
                key={item.id}
                item={item}
                accent={accent}
                onToggle={() => onToggleItem(item)}
                onDelete={() => onDeleteItem(item.id)}
                onRefresh={onRefresh}
              />
            ))}
          </div>

          {addingItem ? (
            <AddItemForm
              categoryId={cat.id}
              sortOrder={cat.items.length + 1}
              onDone={() => { setAddingItem(false); onRefresh(); }}
              onCancel={() => setAddingItem(false)}
            />
          ) : (
            <button
              onClick={() => setAddingItem(true)}
              className="mt-4 flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] uppercase transition-colors"
              style={{ color: `${accent}80` }}
              onMouseEnter={(e) => (e.currentTarget.style.color = accent)}
              onMouseLeave={(e) => (e.currentTarget.style.color = `${accent}80`)}
            >
              <Plus className="h-3.5 w-3.5" /> Adaugă produs
            </button>
          )}

          {/* Subcategories — only for top-level */}
          {!isSubcategory && (
            <div className="mt-5 space-y-3">
              {cat.subcategories.map((sub) => (
                <CategoryBlock
                  key={sub.id}
                  cat={sub}
                  accent={accent}
                  venue={venue}
                  expanded={false}
                  onToggleExpand={() => {}}
                  onDeleteCategory={async () => {
                    if (!confirm("Ștergi subcategoria și produsele ei?")) return;
                    await deleteCategory(sub.id);
                    onRefresh();
                  }}
                  onToggleItem={onToggleItem}
                  onDeleteItem={onDeleteItem}
                  onRefresh={onRefresh}
                  isSubcategory
                  expandedSet={expandedSet}
                  onToggleExpandSub={onToggleExpandSub}
                />
              ))}

              {addingSubcat ? (
                <div className="ml-6 flex flex-wrap items-center gap-3 rounded-xl border border-white/8 bg-white/[0.03] p-3">
                  <input
                    autoFocus
                    placeholder="Subcategorie RO"
                    value={newSubRo}
                    onChange={(e) => setNewSubRo(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAddSubcategory()}
                    className="flex-1 rounded-lg border border-white/10 bg-white/[0.06] px-3 py-2 text-sm text-[#f5f0e8] placeholder-white/25 outline-none min-w-[120px]"
                  />
                  <input
                    placeholder="Subcategorie EN"
                    value={newSubEn}
                    onChange={(e) => setNewSubEn(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAddSubcategory()}
                    className="flex-1 rounded-lg border border-white/10 bg-white/[0.06] px-3 py-2 text-sm text-[#f5f0e8] placeholder-white/25 outline-none min-w-[120px]"
                  />
                  <button onClick={handleAddSubcategory} className="rounded-lg p-2 text-green-400 hover:bg-green-400/10"><Check className="h-4 w-4" /></button>
                  <button onClick={() => setAddingSubcat(false)} className="rounded-lg p-2 text-red-400 hover:bg-red-400/10"><X className="h-4 w-4" /></button>
                </div>
              ) : (
                <button
                  onClick={() => setAddingSubcat(true)}
                  className="ml-6 mt-1 flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] uppercase text-white/20 transition-colors hover:text-white/50"
                >
                  <Plus className="h-3.5 w-3.5" /> Subcategorie
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ItemRow({ item, accent, onToggle, onDelete, onRefresh }: {
  item: MenuItem;
  accent: string;
  onToggle: () => void;
  onDelete: () => void;
  onRefresh: () => void;
}) {
  const [editing, setEditing] = useState(false);
  const [nameRo, setNameRo] = useState(item.name_ro);
  const [nameEn, setNameEn] = useState(item.name_en);
  const [price, setPrice] = useState(String(item.price));
  const [unit, setUnit] = useState(item.unit ?? "");

  async function saveItem() {
    await updateItem(item.id, {
      name_ro: nameRo,
      name_en: nameEn,
      price: parseFloat(price) || 0,
      unit: unit || null,
    });
    setEditing(false);
    onRefresh();
  }

  if (editing) {
    return (
      <div className="flex flex-wrap items-center gap-2 py-3">
        <input value={nameRo} onChange={(e) => setNameRo(e.target.value)} placeholder="Nume RO"
          className="flex-1 rounded-lg border border-white/10 bg-white/[0.06] px-3 py-1.5 text-sm text-[#f5f0e8] outline-none min-w-[120px]" />
        <input value={nameEn} onChange={(e) => setNameEn(e.target.value)} placeholder="Nume EN"
          className="flex-1 rounded-lg border border-white/10 bg-white/[0.06] px-3 py-1.5 text-sm text-[#f5f0e8] outline-none min-w-[120px]" />
        <input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Preț" type="number"
          className="w-24 rounded-lg border border-white/10 bg-white/[0.06] px-3 py-1.5 text-sm text-[#f5f0e8] outline-none" />
        <input value={unit} onChange={(e) => setUnit(e.target.value)} placeholder="Unitate"
          className="w-24 rounded-lg border border-white/10 bg-white/[0.06] px-3 py-1.5 text-sm text-[#f5f0e8] outline-none" />
        <button onClick={saveItem} className="text-green-400 hover:text-green-300"><Check className="h-4 w-4" /></button>
        <button onClick={() => setEditing(false)} className="text-red-400 hover:text-red-300"><X className="h-4 w-4" /></button>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 py-3 ${!item.available ? "opacity-40" : ""}`}>
      <div className="flex-1">
        <span className="text-sm text-[#f5f0e8]">{item.name_ro}</span>
        {item.unit && <span className="ml-2 text-xs text-white/30">{item.unit}</span>}
      </div>
      <span className="tabular-nums text-sm font-semibold" style={{ color: accent }}>
        {item.price} lei
      </span>
      <button onClick={onToggle} className="rounded-lg p-1.5 text-white/30 hover:text-white/70" title="Toggle disponibil">
        {item.available
          ? <ToggleRight className="h-4 w-4 text-green-400" />
          : <ToggleLeft className="h-4 w-4" />
        }
      </button>
      <button onClick={() => setEditing(true)} className="rounded-lg p-1.5 text-white/30 hover:text-white/70">
        <Pencil className="h-3.5 w-3.5" />
      </button>
      <button onClick={onDelete} className="rounded-lg p-1.5 text-white/30 hover:text-red-400">
        <Trash2 className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

function AddItemForm({ categoryId, sortOrder, onDone, onCancel }: {
  categoryId: string;
  sortOrder: number;
  onDone: () => void;
  onCancel: () => void;
}) {
  const [nameRo, setNameRo] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [price, setPrice] = useState("");
  const [unit, setUnit] = useState("");

  async function handleAdd() {
    if (!nameRo.trim() || !price) return;
    await addItem({
      category_id: categoryId,
      name_ro: nameRo.trim(),
      name_en: nameEn.trim() || nameRo.trim(),
      description_ro: null,
      description_en: null,
      price: parseFloat(price),
      unit: unit.trim() || null,
      available: true,
      sort_order: sortOrder,
    });
    onDone();
  }

  return (
    <div className="mt-3 flex flex-wrap items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] p-3">
      <input autoFocus value={nameRo} onChange={(e) => setNameRo(e.target.value)} placeholder="Nume RO *"
        onKeyDown={(e) => e.key === "Enter" && handleAdd()}
        className="flex-1 rounded-lg border border-white/10 bg-white/[0.06] px-3 py-2 text-sm text-[#f5f0e8] placeholder-white/25 outline-none min-w-[120px]" />
      <input value={nameEn} onChange={(e) => setNameEn(e.target.value)} placeholder="Nume EN"
        className="flex-1 rounded-lg border border-white/10 bg-white/[0.06] px-3 py-2 text-sm text-[#f5f0e8] placeholder-white/25 outline-none min-w-[120px]" />
      <input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Preț *" type="number"
        className="w-24 rounded-lg border border-white/10 bg-white/[0.06] px-3 py-2 text-sm text-[#f5f0e8] placeholder-white/25 outline-none" />
      <input value={unit} onChange={(e) => setUnit(e.target.value)} placeholder="ex: 330ml"
        className="w-24 rounded-lg border border-white/10 bg-white/[0.06] px-3 py-2 text-sm text-[#f5f0e8] placeholder-white/25 outline-none" />
      <button onClick={handleAdd} className="rounded-lg p-2 text-green-400 hover:bg-green-400/10"><Check className="h-4 w-4" /></button>
      <button onClick={onCancel} className="rounded-lg p-2 text-red-400 hover:bg-red-400/10"><X className="h-4 w-4" /></button>
    </div>
  );
}
