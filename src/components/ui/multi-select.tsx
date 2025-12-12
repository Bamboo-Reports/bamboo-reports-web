import * as React from "react";
import { ChevronDown, X } from "lucide-react";
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

export type IncludeExcludeFilter = {
    include: string[];
    exclude: string[];
};

interface MultiSelectProps {
    options: string[];
    selection: IncludeExcludeFilter;
    onChange: (selection: IncludeExcludeFilter) => void;
    placeholder?: string;
    className?: string;
}

export function MultiSelect({
    options,
    selection,
    onChange,
    placeholder = "Select...",
    className,
}: MultiSelectProps) {
    const [open, setOpen] = React.useState(false);
    const [searchTerm, setSearchTerm] = React.useState("");

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

    const toggleInclude = (value: string) => {
        const isIncluded = selection.include.includes(value);

        if (isIncluded) {
            onChange({
                include: selection.include.filter((item) => item !== value),
                exclude: selection.exclude,
            });
            return;
        }

        onChange({
            include: [...selection.include, value],
            exclude: selection.exclude.filter((item) => item !== value),
        });
    };

    const toggleExclude = (value: string) => {
        const isExcluded = selection.exclude.includes(value);

        if (isExcluded) {
            onChange({
                include: selection.include,
                exclude: selection.exclude.filter((item) => item !== value),
            });
            return;
        }

        onChange({
            include: selection.include.filter((item) => item !== value),
            exclude: [...selection.exclude, value],
        });
    };

    const handleClear = (e: React.MouseEvent) => {
        e.stopPropagation();
        onChange({ include: [], exclude: [] });
    };

    const totalSelections = selection.include.length + selection.exclude.length;
    const selectionBadges =
        totalSelections <= 2
            ? [
                ...selection.include.map((value) => ({ value, type: "include" as const })),
                ...selection.exclude.map((value) => ({ value, type: "exclude" as const })),
            ]
            : [];
    const selectionSummary =
        totalSelections > 2
            ? `${selection.include.length} include, ${selection.exclude.length} exclude`
            : null;

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
                        {totalSelections === 0 ? (
                            <span className="text-muted-foreground">{placeholder}</span>
                        ) : selectionBadges.length > 0 ? (
                            selectionBadges.map(({ value, type }) => (
                                <Badge
                                    key={`${type}-${value}`}
                                    variant="secondary"
                                    className={cn(
                                        "text-xs border",
                                        type === "include"
                                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                            : "bg-red-50 text-red-700 border-red-200"
                                    )}
                                >
                                    {type === "include" ? `+ ${value}` : `- ${value}`}
                                </Badge>
                            ))
                        ) : (
                            <Badge variant="secondary" className="text-xs border">
                                {selectionSummary}
                            </Badge>
                        )}
                    </div>
                    <div className="flex items-center gap-1">
                        {totalSelections > 0 && (
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
                <ScrollArea className="max-h-60">
                    <div className="p-2">
                        {filteredOptions.length === 0 ? (
                            <p className="text-sm text-muted-foreground text-center py-4">
                                {options.length === 0
                                    ? "No options available"
                                    : "No matches for your search"}
                            </p>
                        ) : (
                            filteredOptions.map((option) => {
                                const isIncluded = selection.include.includes(option);
                                const isExcluded = selection.exclude.includes(option);

                                return (
                                    <div
                                        key={option}
                                        className={cn(
                                            "flex items-center gap-3 px-2 py-2 rounded-sm hover:bg-accent/40",
                                            isIncluded && "bg-emerald-50/60",
                                            isExcluded && "bg-red-50/60"
                                        )}
                                    >
                                        <span className="text-sm flex-1 truncate">{option}</span>
                                        <div className="flex gap-2">
                                            <button
                                                type="button"
                                                onClick={() => toggleInclude(option)}
                                                aria-pressed={isIncluded}
                                                className={cn(
                                                    "px-2 py-1 text-xs rounded border transition-colors",
                                                    isIncluded
                                                        ? "bg-emerald-50 text-emerald-700 border-emerald-400 font-semibold"
                                                        : "border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                                                )}
                                            >
                                                Include
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => toggleExclude(option)}
                                                aria-pressed={isExcluded}
                                                className={cn(
                                                    "px-2 py-1 text-xs rounded border transition-colors",
                                                    isExcluded
                                                        ? "bg-red-50 text-red-700 border-red-400 font-semibold"
                                                        : "border-red-200 text-red-700 hover:bg-red-50"
                                                )}
                                            >
                                                Exclude
                                            </button>
                                        </div>
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
