"use client";

import { RiArrowDownSLine, RiCheckLine, RiSearchLine } from "@remixicon/react";
import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type MultiSelectOption = {
  value: string;
  /** Longer text for the list, e.g. abbreviations spelled out. */
  label?: string;
  /** No company would match; shown greyed out unless already selected. */
  disabled?: boolean;
};

export type MultiSelectGroup = { label?: string; options: MultiSelectOption[] };

/**
 * A filter dropdown that takes several values: a button that summarises the
 * selection, opening a checkbox list. Escape or a click outside closes it.
 */
const MultiSelect = ({
  label,
  values,
  groups,
  onChange,
  searchable = false,
}: {
  label: string;
  values: string[];
  groups: MultiSelectGroup[];
  onChange: (values: string[]) => void;
  /** Adds a filter box inside the panel, for long lists such as cities. */
  searchable?: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const root = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    // Move focus into the panel so the list is reachable straight away.
    panel.current?.querySelector<HTMLElement>("input")?.focus();
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const toggle = (value: string) =>
    onChange(values.includes(value) ? values.filter((v) => v !== value) : [...values, value]);

  const q = query.trim().toLowerCase();
  const visible = groups
    .map((g) => ({ ...g, options: g.options.filter((o) => !q || (o.label ?? o.value).toLowerCase().includes(q)) }))
    .filter((g) => g.options.length);

  const summary = values.length === 0 ? "All" : values.length === 1 ? values[0] : `${values[0]} +${values.length - 1}`;

  return (
    <div
      ref={root}
      // Tabbing out of the panel closes it, like a click outside does.
      onBlur={(e) => {
        if (e.relatedTarget && !root.current?.contains(e.relatedTarget as Node)) setOpen(false);
      }}
      className="relative flex min-w-0 flex-col gap-1.5"
    >
      <span id={`${id}-label`} className="text-sm font-medium text-ink-soft">
        {label}
      </span>
      <button
        ref={button}
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls={`${id}-panel`}
        aria-labelledby={`${id}-label ${id}-value`}
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "flex h-11 w-full items-center justify-between gap-2 rounded-md border border-line-strong bg-background px-3 text-left text-sm text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          open && "border-primary",
        )}
      >
        <span id={`${id}-value`} className={cn("truncate", values.length === 0 && "text-ink-soft")}>
          {summary}
        </span>
        <RiArrowDownSLine
          aria-hidden
          className={cn("size-4 shrink-0 text-ink-muted transition-transform duration-150", open && "rotate-180")}
        />
      </button>

      {open ? (
        <div
          ref={panel}
          id={`${id}-panel`}
          role="group"
          aria-labelledby={`${id}-label`}
          className="absolute inset-x-0 top-full z-30 mt-1 min-w-[16rem] overflow-hidden rounded-md border border-line bg-background shadow-[0_8px_24px_-6px_rgb(12_14_18/0.18)] motion-safe:animate-menu-in"
        >
          {searchable ? (
            <div className="relative border-b border-line p-2">
              <RiSearchLine aria-hidden className="pointer-events-none absolute left-5 top-1/2 size-4 -translate-y-1/2 text-ink-muted" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={`Find a ${label.toLowerCase()}`}
                aria-label={`Find a ${label.toLowerCase()}`}
                className="h-9 w-full rounded-sm bg-surface-subtle pl-9 pr-2 text-sm text-ink placeholder:text-ink-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
          ) : null}

          <div className="max-h-72 overflow-y-auto overscroll-contain py-1">
            {visible.length ? (
              visible.map((g) => (
                <div key={g.label ?? "options"} role={g.label ? "group" : undefined} aria-label={g.label}>
                  {g.label ? <p className="px-3 pb-1 pt-2 text-xs font-medium text-ink-muted">{g.label}</p> : null}
                  {g.options.map((o) => {
                    const checked = values.includes(o.value);
                    const disabled = o.disabled && !checked;
                    return (
                      <label
                        key={o.value}
                        className={cn(
                          "flex cursor-pointer items-start gap-2.5 px-3 py-2 text-sm text-ink hover:bg-surface-subtle has-[:focus-visible]:bg-surface-subtle",
                          disabled && "cursor-not-allowed text-ink-muted hover:bg-transparent",
                        )}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          disabled={disabled}
                          onChange={() => toggle(o.value)}
                          className="peer sr-only"
                        />
                        <span
                          aria-hidden
                          className={cn(
                            "mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-[4px] border border-line-strong bg-background peer-focus-visible:ring-2 peer-focus-visible:ring-ring",
                            checked && "border-primary bg-primary text-primary-foreground",
                          )}
                        >
                          {checked ? <RiCheckLine className="size-3.5" /> : null}
                        </span>
                        <span>{o.label ?? o.value}</span>
                      </label>
                    );
                  })}
                </div>
              ))
            ) : (
              <p className="px-3 py-4 text-sm text-ink-muted">No {label.toLowerCase()} matches “{query}”.</p>
            )}
          </div>

          {values.length ? (
            <div className="flex items-center justify-between border-t border-line px-3 py-1.5 text-sm">
              <span className="text-ink-soft">{values.length} selected</span>
              <button
                type="button"
                onClick={() => onChange([])}
                className="rounded-sm px-1 py-1.5 font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Clear
              </button>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default MultiSelect;
