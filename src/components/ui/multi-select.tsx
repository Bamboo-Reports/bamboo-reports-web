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
                            filteredOptions.map((option) => (
                                <div
                                    key={option}
                                    className={cn(
                                        "flex items-center gap-2 px-2 py-1.5 rounded-sm cursor-pointer hover:bg-accent",
                                        selected.includes(option) && "bg-accent"
                                    )}
                                    onClick={() => handleSelect(option)}
                                >
                                    <div
                                        className={cn(
                                            "h-4 w-4 border rounded flex items-center justify-center",
                                            selected.includes(option)
                                                ? "bg-primary border-primary"
                                                : "border-input"
                                        )}
                                    >
                                        {selected.includes(option) && (
                                            <Check className="h-3 w-3 text-primary-foreground" />
                                        )}
                                    </div>
                                    <span className="text-sm">{option}</span>
                                </div>
                            ))
                        )}
                    </div>
                </ScrollArea>
            </PopoverContent>
        </Popover>
    );
}
