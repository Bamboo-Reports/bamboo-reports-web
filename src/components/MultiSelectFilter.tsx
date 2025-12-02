import * as React from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

interface MultiSelectFilterProps {
    title: string;
    options: string[];
    selectedValues: string[];
    onSelectionChange: (values: string[]) => void;
}

export function MultiSelectFilter({
    title,
    options,
    selectedValues,
    onSelectionChange,
}: MultiSelectFilterProps) {
    const selectedSet = new Set(selectedValues);

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" className="h-10 px-3 font-normal">
                    <span className="mr-2">{title}</span>
                    {selectedSet.size > 0 && (
                        <span className="ml-1 rounded-sm bg-secondary px-1.5 py-0.5 text-xs font-medium text-secondary-foreground">
                            {selectedSet.size}
                        </span>
                    )}
                    <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0" align="start">
                <Command>
                    <CommandInput placeholder={title} />
                    <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup>
                            {options.map((option) => {
                                const isSelected = selectedSet.has(option);
                                return (
                                    <CommandItem
                                        key={option}
                                        onSelect={() => {
                                            const newSelected = new Set(selectedValues);
                                            if (isSelected) {
                                                newSelected.delete(option);
                                            } else {
                                                newSelected.add(option);
                                            }
                                            onSelectionChange(Array.from(newSelected));
                                        }}
                                    >
                                        <div
                                            className={cn(
                                                "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                                                isSelected
                                                    ? "bg-primary text-primary-foreground"
                                                    : "opacity-50 [&_svg]:invisible"
                                            )}
                                        >
                                            <Check className={cn("h-4 w-4")} />
                                        </div>
                                        <span>{option}</span>
                                    </CommandItem>
                                );
                            })}
                        </CommandGroup>
                        {selectedSet.size > 0 && (
                            <>
                                <CommandSeparator />
                                <CommandGroup>
                                    <CommandItem
                                        onSelect={() => onSelectionChange([])}
                                        className="justify-center text-center"
                                    >
                                        Clear filters
                                    </CommandItem>
                                </CommandGroup>
                            </>
                        )}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
