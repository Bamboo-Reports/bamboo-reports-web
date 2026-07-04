import * as React from "react";
import { Check, ChevronsUpDown, Search } from "lucide-react";
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
}

export function MultiSelectFilter({
  label,
  options,
  value,
  onValueChange,
  disabled,
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
            className="h-9 border-0 px-0 focus-visible:ring-0 focus-visible:ring-offset-0"
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
                    "flex w-full items-center gap-3 rounded-sm px-2 py-2 text-sm outline-none transition-colors duration-micro ease-smooth hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                    checked && "bg-accent/50"
                  )}
                >
                  <Checkbox checked={checked} tabIndex={-1} className="pointer-events-none" />
                  <span className="flex-1 text-left">{option.value}</span>
                  <span className="text-xs tabular-nums text-muted-foreground">
                    {option.count.toLocaleString()}
                  </span>
                  {checked && <Check className="h-4 w-4 text-primary" />}
                </button>
              );
            })
          )}
        </div>
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
