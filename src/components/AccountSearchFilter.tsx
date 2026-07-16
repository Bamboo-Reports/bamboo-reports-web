import { useId, useState } from "react";
import { Lock, Search, X } from "lucide-react";
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
  /** True when the query exactly matches a tracked-but-gated (private) company. */
  isGatedMatch?: boolean;
  /** Set when the query exactly matches an account excluded from the GCC
   * directory; explains why (e.g. "Only Manufacturing presence in India"). */
  nonGccNote?: string | null;
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
  isGatedMatch = false,
  nonGccNote = null,
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
            className="absolute inset-y-0 right-2 z-10 my-auto flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
              className="block w-full rounded-sm px-3 py-2 text-left text-sm transition-colors hover:bg-muted hover:text-foreground focus-visible:bg-muted focus-visible:text-foreground focus-visible:outline-none"
            >
              {option.value}
            </button>
          ))
        ) : nonGccNote ? (
          <div className="px-3 py-4 text-sm">
            <p className="font-medium text-foreground">{query.trim()}</p>
            <p className="mt-1 text-muted-foreground">{nonGccNote}.</p>
          </div>
        ) : isGatedMatch ? (
          <div className="px-3 py-4 text-sm">
            <p className="flex items-center gap-1.5 font-medium text-foreground">
              {query.trim()}
              <Lock className="h-3.5 w-3.5 text-muted-foreground" aria-hidden />
            </p>
            <a
              href="/signup?src=gcc-search-gated"
              className="mt-1 inline-block font-medium text-primary hover:underline"
            >
              Sign up for free to unlock
            </a>
          </div>
        ) : (
          <div className="px-3 py-4 text-sm">
            <p className="text-muted-foreground">Not in our directory yet.</p>
            <a
              href="/signup?src=gcc-search-missing"
              className="mt-1 inline-block font-medium text-primary hover:underline"
            >
              Sign up for free to request it
            </a>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
