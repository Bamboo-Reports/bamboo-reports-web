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
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <Download className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                            <DialogTitle className="text-left">Export Companies</DialogTitle>
                            <DialogDescription className="text-left text-xs mt-1">
                                Choose which companies to export
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                <div className="space-y-3 py-4">
                    {/* Download All Option */}
                    <button
                        type="button"
                        className="w-full flex items-start gap-3 p-4 rounded-lg border-2 border-slate-200 bg-white hover:bg-slate-50 hover:border-primary transition-all cursor-pointer"
                        onClick={onSelectAll}
                    >
                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                            <Download className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="flex-1 text-left">
                            <div className="font-semibold text-sm mb-1 text-slate-900">Download All Filtered</div>
                            <div className="text-xs text-slate-600">
                                Export all {totalCount.toLocaleString()} companies matching current filters
                            </div>
                        </div>
                    </button>

                    {/* Download Selected Option */}
                    <button
                        type="button"
                        className="w-full flex items-start gap-3 p-4 rounded-lg border-2 border-slate-200 bg-white hover:bg-slate-50 hover:border-primary transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-slate-200"
                        onClick={onSelectSelected}
                        disabled={selectedCount === 0}
                    >
                        <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0">
                            <ListChecks className="h-5 w-5 text-emerald-600" />
                        </div>
                        <div className="flex-1 text-left">
                            <div className="font-semibold text-sm mb-1 text-slate-900">Download Selected</div>
                            <div className="text-xs text-slate-600">
                                {selectedCount === 0
                                    ? 'No companies selected'
                                    : `Export ${selectedCount.toLocaleString()} selected ${selectedCount === 1 ? 'company' : 'companies'}`}
                            </div>
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
