import { useId, useState } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { FacetOption } from "@/lib/tracker";

const MIN_QUERY_LENGTH = 2;

interface AccountSearchFilterProps {
  query: string;
  selectedAccount?: string;
  suggestions: FacetOption[];
  isSearching: boolean;
  disabled?: boolean;
  onQueryChange: (query: string) => void;
  onSelect: (account: string) => void;
  onClear: () => void;
}

export function AccountSearchFilter({
  query,
  selectedAccount,
  suggestions,
  isSearching,
  disabled,
  onQueryChange,
  onSelect,
  onClear,
}: AccountSearchFilterProps) {
  const [open, setOpen] = useState(false);
  const listboxId = useId();
  const canShowSuggestions =
    !selectedAccount && query.trim().length >= MIN_QUERY_LENGTH;

  const handleQueryChange = (value: string) => {
    onQueryChange(value);
    setOpen(value.trim().length >= MIN_QUERY_LENGTH);
  };

  const handleSelect = (account: string) => {
    onSelect(account);
    setOpen(false);
  };

  const handleClear = () => {
    onClear();
    setOpen(false);
  };

  return (
    <Popover
      open={open && canShowSuggestions}
      onOpenChange={(next) => setOpen(next && canShowSuggestions)}
    >
      <div className="relative">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden
        />
        <PopoverTrigger asChild>
          <Input
            type="text"
            role="combobox"
            aria-autocomplete="list"
            aria-controls={listboxId}
            aria-expanded={open && canShowSuggestions}
            value={selectedAccount ?? query}
            placeholder="Search companies"
            disabled={disabled}
            autoComplete="off"
            className="pl-9 pr-10"
            onFocus={() => setOpen(canShowSuggestions)}
            onChange={(event) => handleQueryChange(event.target.value)}
          />
        </PopoverTrigger>
        {(selectedAccount || query) && !disabled && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-2 top-1/2 z-10 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Clear company"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <PopoverContent
        id={listboxId}
        role="listbox"
        align="start"
        onOpenAutoFocus={(event) => event.preventDefault()}
        className="w-[var(--radix-popover-trigger-width)] min-w-72 p-1 data-[state=open]:animate-none data-[state=closed]:animate-none"
      >
        {isSearching ? (
          <p className="px-3 py-4 text-sm text-muted-foreground">Searching companies…</p>
        ) : suggestions.length > 0 ? (
          suggestions.map((option) => (
            <button
              key={option.value}
              type="button"
              role="option"
              aria-selected={false}
              onClick={() => handleSelect(option.value)}
              className="block w-full rounded-sm px-3 py-2 text-left text-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground focus-visible:outline-none"
            >
              {option.value}
            </button>
          ))
        ) : (
          <p className="px-3 py-4 text-sm text-muted-foreground">No companies found</p>
        )}
      </PopoverContent>
    </Popover>
  );
}
