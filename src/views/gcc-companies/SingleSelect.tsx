"use client";

import { RiArrowDownSLine, RiCheckLine } from "@remixicon/react";
import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { cn } from "@/lib/utils";

/**
 * A one-choice dropdown styled to match MultiSelect, built as a listbox:
 * arrow keys move, Enter or Space picks, Escape or a click outside closes.
 */
const SingleSelect = ({
  label,
  value,
  options,
  onChange,
  className,
}: {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  className?: string;
}) => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const id = useId();
  const selected = Math.max(0, options.findIndex((o) => o.value === value));

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    list.current?.focus();
    return () => document.removeEventListener("pointerdown", onPointer);
  }, [open]);

  const openAt = (index: number) => {
    setActive(index);
    setOpen(true);
  };

  const close = () => {
    setOpen(false);
    button.current?.focus();
  };

  const pick = (index: number) => {
    onChange(options[index].value);
    close();
  };

  const onButtonKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      openAt(selected);
    }
  };

  const onListKey = (e: KeyboardEvent) => {
    const last = options.length - 1;
    const moves: Record<string, number> = {
      ArrowDown: Math.min(active + 1, last),
      ArrowUp: Math.max(active - 1, 0),
      Home: 0,
      End: last,
    };
    if (e.key in moves) {
      e.preventDefault();
      setActive(moves[e.key]);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      pick(active);
    } else if (e.key === "Escape" || e.key === "Tab") {
      if (e.key === "Escape") e.preventDefault();
      close();
    }
  };

  return (
    <div ref={root} className={cn("relative flex items-center gap-2", className)}>
      <span id={`${id}-label`} className="text-sm font-medium text-ink-soft">
        {label}
      </span>
      <button
        ref={button}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${id}-list`}
        aria-labelledby={`${id}-label ${id}-value`}
        onClick={() => (open ? setOpen(false) : openAt(selected))}
        onKeyDown={onButtonKey}
        className={cn(
          "flex h-11 items-center gap-2 rounded-md border border-line-strong bg-background px-3 text-sm text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          open && "border-primary",
        )}
      >
        <span id={`${id}-value`}>{options[selected]?.label}</span>
        <RiArrowDownSLine
          aria-hidden
          className={cn("size-4 shrink-0 text-ink-muted transition-transform duration-150", open && "rotate-180")}
        />
      </button>

      {open ? (
        <ul
          ref={list}
          id={`${id}-list`}
          role="listbox"
          tabIndex={-1}
          aria-labelledby={`${id}-label`}
          aria-activedescendant={`${id}-opt-${active}`}
          onKeyDown={onListKey}
          className="absolute right-0 top-full z-30 mt-1 min-w-full overflow-hidden rounded-md border border-line bg-background py-1 shadow-[0_8px_24px_-6px_rgb(12_14_18/0.18)] focus-visible:outline-none motion-safe:animate-menu-in"
        >
          {options.map((o, i) => (
            <li
              key={o.value}
              id={`${id}-opt-${i}`}
              role="option"
              aria-selected={i === selected}
              onPointerEnter={() => setActive(i)}
              onClick={() => pick(i)}
              className={cn(
                "flex cursor-pointer items-center justify-between gap-6 whitespace-nowrap px-3 py-2 text-sm text-ink",
                i === active && "bg-surface-subtle",
                i === selected && "font-semibold",
              )}
            >
              {o.label}
              {i === selected ? <RiCheckLine aria-hidden className="size-4 text-primary" /> : null}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default SingleSelect;
