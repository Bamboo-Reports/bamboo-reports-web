import * as React from "react";
import { Check, ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "./popover";
import { Badge } from "./badge";
import { ScrollArea } from "./scroll-area";
import { Input } from "./input";

interface MultiSelectProps {
    options: string[];
    selected: string[];
    onChange: (selected: string[]) => void;
    placeholder?: string;
    className?: string;
}

export function MultiSelect({
    options,
    selected,
    onChange,
    placeholder = "Select...",
    className,
}: MultiSelectProps) {
    const [open, setOpen] = React.useState(false);
    const [searchTerm, setSearchTerm] = React.useState("");
    const [showAllVisual, setShowAllVisual] = React.useState(selected.length === 0);

    const filteredOptions = React.useMemo(() => {
        const term = searchTerm.trim().toLowerCase();
        if (!term) return options;

        return options.filter((option) =>
            option.toLowerCase().includes(term)
        );
    }, [options, searchTerm]);

    React.useEffect(() => {
        if (!open) {
            setSearchTerm("");
        }
    }, [open]);

    React.useEffect(() => {
        if (selected.length > 0) {
            setShowAllVisual(false);
        }
    }, [selected.length]);

    const effectiveSelected = showAllVisual ? options : selected;
    const isAllSelected = options.length > 0 && effectiveSelected.length === options.length;

    const handleSelect = (value: string) => {
        const base = showAllVisual ? options : selected;
        const isSelected = base.includes(value);
        const next = isSelected
            ? base.filter((item) => item !== value)
            : [...base, value];

        if (next.length === options.length) {
            setShowAllVisual(true);
            onChange([]);
        } else {
            setShowAllVisual(false);
            onChange(next);
        }
    };

    const handleSelectAll = () => {
        if (isAllSelected) {
            setShowAllVisual(false);
            onChange([]);
        } else {
            setShowAllVisual(true);
            onChange([]);
        }
    };

    const handleClearAll = (e: React.MouseEvent) => {
        e.stopPropagation();
        setShowAllVisual(false);
        onChange([]);
    };

    const handleClear = (e: React.MouseEvent) => {
        e.stopPropagation();
        setShowAllVisual(false);
        onChange([]);
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={cn("w-full justify-between font-normal h-auto min-h-10", className)}
                >
                    <div className="flex flex-wrap gap-1 flex-1">
                        {showAllVisual ? (
                            <span className="text-muted-foreground">All selected</span>
                        ) : selected.length <= 2 ? (
                            selected.map((item) => (
                                <Badge key={item} variant="secondary" className="text-xs">
                                    {item}
                                </Badge>
                            ))
                        ) : (
                            <Badge variant="secondary" className="text-xs">
                                {selected.length} selected
                            </Badge>
                        )}
                    </div>
                    <div className="flex items-center gap-1">
                        {(showAllVisual || selected.length > 0) && (
                            <X
                                className="h-4 w-4 shrink-0 opacity-50 hover:opacity-100"
                                onClick={handleClear}
                            />
                        )}
                        <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
                    </div>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0" align="start">
                <div className="p-2 border-b">
                    <Input
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search options..."
                        className="h-9 text-sm"
                        aria-label="Search options"
                    />
                </div>
                <div
                    className={cn(
                        "flex items-center justify-between gap-2 px-2 py-1.5 border-b",
                        "bg-white"
                    )}
                >
                    <button
                        type="button"
                        onClick={handleSelectAll}
                        className={cn(
                            "flex items-center gap-2 rounded px-2 py-1 text-sm transition",
                            "hover:bg-slate-100",
                            isAllSelected && "bg-slate-100"
                        )}
                        disabled={options.length === 0}
                    >
                        <div
                            className={cn(
                                "h-4 w-4 border rounded flex items-center justify-center",
                                isAllSelected
                                    ? "bg-primary/10 border-primary"
                                    : "border-input"
                            )}
                        >
                            {isAllSelected && <Check className="h-3 w-3 text-primary" />}
                        </div>
                        <span className="text-sm">
                            Select all ({options.length})
                        </span>
                    </button>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 text-xs px-2"
                        onClick={handleClearAll}
                        disabled={options.length === 0 && selected.length === 0 && !showAllVisual}
                    >
                        Clear
                    </Button>
                </div>

                <ScrollArea className="h-60">
                    <div className="p-2">
                        {filteredOptions.length === 0 ? (
                            <p className="text-sm text-muted-foreground text-center py-4">
                                {options.length === 0
                                    ? "No options available"
                                    : "No matches for your search"}
                            </p>
                        ) : (
                            filteredOptions.map((option) => {
                                const isSelected = effectiveSelected.includes(option);

                                return (
                                    <div
                                        key={option}
                                        className={cn(
                                            "flex items-center gap-2 px-2 py-1.5 rounded-sm cursor-pointer",
                                            "hover:bg-slate-100",
                                            isSelected && "bg-slate-100"
                                        )}
                                        onClick={() => handleSelect(option)}
                                    >
                                        <div
                                            className={cn(
                                                "h-4 w-4 border rounded flex items-center justify-center",
                                                isSelected
                                                    ? "bg-primary/10 border-primary"
                                                    : "border-input"
                                            )}
                                        >
                                            {isSelected && (
                                                <Check className="h-3 w-3 text-primary" />
                                            )}
                                        </div>
                                        <span className="text-sm">{option}</span>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </ScrollArea>
            </PopoverContent>
        </Popover>
    );
}
