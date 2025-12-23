import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { Download, ListChecks } from 'lucide-react';

interface DownloadTypeSelectionDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSelectAll: () => void;
    onSelectSelected: () => void;
    totalCount: number;
    selectedCount: number;
}

export function DownloadTypeSelectionDialog({
    open,
    onOpenChange,
    onSelectAll,
    onSelectSelected,
    totalCount,
    selectedCount,
}: DownloadTypeSelectionDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-lg">
                <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 font-semibold text-primary">
                        Step 1 of 3
                    </span>
                    <span>Scope</span>
                    <span className="sm:ml-auto inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-slate-600">
                        {totalCount.toLocaleString()} filtered
                    </span>
                    <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-emerald-700">
                        {selectedCount.toLocaleString()} selected
                    </span>
                </div>

                <DialogHeader>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <Download className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                            <DialogTitle className="text-left">Export Companies</DialogTitle>
                            <DialogDescription className="text-left text-xs mt-1">
                                Choose the scope of companies to export.
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                <div className="space-y-3 py-4">
                    {/* Export All Option */}
                    <button
                        type="button"
                        className="w-full rounded-xl border-2 border-slate-200 bg-white p-4 text-left transition-all hover:border-primary hover:bg-slate-50"
                        onClick={onSelectAll}
                    >
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                                <Download className="h-5 w-5 text-blue-600" />
                            </div>
                            <div className="flex-1">
                                <div className="font-semibold text-sm mb-1 text-slate-900">Export All Filtered</div>
                                <div className="text-xs text-slate-600">
                                    Export all {totalCount.toLocaleString()} companies matching your current filters.
                                </div>
                            </div>
                            <span className="mt-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold uppercase text-emerald-700">
                                Recommended
                            </span>
                        </div>
                    </button>

                    {/* Export Selected Option */}
                    <button
                        type="button"
                        className="w-full rounded-xl border-2 border-slate-200 bg-white p-4 text-left transition-all hover:border-primary hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-slate-200 disabled:hover:bg-white"
                        onClick={onSelectSelected}
                        disabled={selectedCount === 0}
                    >
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0">
                                <ListChecks className="h-5 w-5 text-emerald-600" />
                            </div>
                            <div className="flex-1">
                                <div className="font-semibold text-sm mb-1 text-slate-900">Export Selected</div>
                                <div className="text-xs text-slate-600">
                                    {selectedCount === 0
                                        ? 'Select companies in the table to enable this option.'
                                        : `Export ${selectedCount.toLocaleString()} selected ${selectedCount === 1 ? 'company' : 'companies'}.`}
                                </div>
                            </div>
                            <span className="mt-1 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold uppercase text-slate-600">
                                {selectedCount === 0 ? 'Select rows' : `${selectedCount.toLocaleString()} selected`}
                            </span>
                        </div>
                    </button>
                </div>

                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        className="w-full sm:w-auto"
                    >
                        Cancel
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
