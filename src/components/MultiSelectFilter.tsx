import * as React from "react";
import { Check, ChevronsUpDown, Lock, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export interface MultiSelectOption {
  value: string;
  count: number;
}

interface MultiSelectFilterProps {
  label: string;
  options: MultiSelectOption[];
  value: string[];
  onValueChange: (next: string[]) => void;
  disabled?: boolean;
  /** Options beyond the public top-N; shown as a sign-up gate, not listed. */
  lockedCount?: number;
  lockedNoun?: string;
  lockedHref?: string;
}

export function MultiSelectFilter({
  label,
  options,
  value,
  onValueChange,
  disabled,
  lockedCount = 0,
  lockedNoun = "options",
  lockedHref = "/signup",
}: MultiSelectFilterProps) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");

  const selectedSet = React.useMemo(() => new Set(value), [value]);

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return options;
    return options.filter((o) => o.value.toLowerCase().includes(q));
  }, [options, query]);

  const toggle = (v: string) => {
    onValueChange(
      selectedSet.has(v) ? value.filter((x) => x !== v) : [...value, v]
    );
  };

  const clear = () => onValueChange([]);

  const triggerLabel =
    value.length === 0
      ? label
      : value.length === 1
        ? value[0]
        : `${label}: ${value.length}`;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className="w-full justify-between font-normal"
        >
          <span className="truncate">{triggerLabel}</span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] min-w-72 p-0" align="start">
        <div className="flex items-center border-b px-3">
          <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
          <Input
            placeholder={`Search ${label.toLowerCase()}...`}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-9 border-0 px-0 focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0"
          />
        </div>
        <div className="max-h-64 overflow-y-auto p-1">
          {filtered.length === 0 ? (
            <p className="px-3 py-6 text-center text-sm text-muted-foreground">
              No options found
            </p>
          ) : (
            filtered.map((option) => {
              const checked = selectedSet.has(option.value);
              return (
                <button
                  key={option.value}
                  type="button"
                  role="option"
                  aria-selected={checked}
                  onClick={() => toggle(option.value)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-sm px-2 py-2 text-sm outline-none transition-colors duration-micro ease-smooth hover:bg-muted hover:text-foreground focus:bg-muted focus:text-foreground",
                    checked && "bg-muted/70"
                  )}
                >
                  <Checkbox checked={checked} tabIndex={-1} className="pointer-events-none" />
                  <span className="flex-1 text-left">{option.value}</span>
                  {checked && <Check className="h-4 w-4 text-primary" />}
                </button>
              );
            })
          )}
        </div>
        {lockedCount > 0 && (
          <div className="border-t p-1">
            <a
              href={lockedHref}
              className="flex w-full items-center gap-2 rounded-sm px-2 py-2 text-sm font-medium text-primary transition-colors hover:bg-muted"
            >
              <Lock className="h-3.5 w-3.5 shrink-0" />
              Sign up free to unlock {lockedCount.toLocaleString()} more {lockedNoun}
            </a>
          </div>
        )}
        {value.length > 0 && (
          <div className="border-t p-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={clear}
              className="w-full justify-center text-muted-foreground"
            >
              Clear
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
