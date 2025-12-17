import * as React from "react";
import { Check, ChevronDown, X, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "./popover";
import { Badge } from "./badge";
import { ScrollArea } from "./scroll-area";

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
    const [searchQuery, setSearchQuery] = React.useState("");

    const filteredOptions = React.useMemo(() => {
        if (!searchQuery.trim()) return options;
        const query = searchQuery.toLowerCase();
        return options.filter(option => option.toLowerCase().includes(query));
    }, [options, searchQuery]);

    const handleSelect = (value: string) => {
        if (selected.includes(value)) {
            onChange(selected.filter((item) => item !== value));
        } else {
            onChange([...selected, value]);
        }
    };

    const handleClear = (e: React.MouseEvent) => {
        e.stopPropagation();
        onChange([]);
    };

    // Clear search when dropdown closes
    React.useEffect(() => {
        if (!open) {
            setSearchQuery("");
        }
    }, [open]);

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
                        {selected.length === 0 ? (
                            <span className="text-muted-foreground">{placeholder}</span>
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
                        {selected.length > 0 && (
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
                {/* Search Input */}
                <div className="p-2 border-b">
                    <div className="relative">
                        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-8 pr-3 py-1.5 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-gray-300"
                        />
                    </div>
                </div>
                <ScrollArea className="h-[200px]">
                    <div className="p-2">
                        {filteredOptions.length === 0 ? (
                            <p className="text-sm text-muted-foreground text-center py-4">
                                {options.length === 0 ? "No options available" : "No matches found"}
                            </p>
                        ) : (
                            filteredOptions.map((option) => (
                                <div
                                    key={option}
                                    className="flex items-center gap-2 px-2 py-1.5 rounded-sm cursor-pointer hover:bg-gray-50 transition-colors"
                                    onClick={() => handleSelect(option)}
                                >
                                    <div
                                        className={cn(
                                            "h-4 w-4 border rounded flex items-center justify-center transition-colors",
                                            selected.includes(option)
                                                ? "bg-orange-500 border-orange-500"
                                                : "border-gray-300 bg-white"
                                        )}
                                    >
                                        {selected.includes(option) && (
                                            <Check className="h-3 w-3 text-white" />
                                        )}
                                    </div>
                                    <span className="text-sm text-gray-700">{option}</span>
                                </div>
                            ))
                        )}
                    </div>
                </ScrollArea>
            </PopoverContent>
        </Popover>
    );
}

