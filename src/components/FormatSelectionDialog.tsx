import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { FileSpreadsheet, FileText, ArrowLeft } from 'lucide-react';

interface FormatSelectionDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSelectXLSX: () => void;
    onSelectCSV: () => void;
    onBack: () => void;
    exportCount: number;
    exportScopeLabel: string;
}

export function FormatSelectionDialog({
    open,
    onOpenChange,
    onSelectXLSX,
    onSelectCSV,
    onBack,
    exportCount,
    exportScopeLabel,
}: FormatSelectionDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-lg">
                <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 font-semibold text-primary">
                        Step 2 of 3
                    </span>
                    <span>Format</span>
                </div>

                <DialogHeader>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <FileSpreadsheet className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                            <DialogTitle className="text-left">Choose Format</DialogTitle>
                            <DialogDescription className="text-left text-xs mt-1">
                                Select the file type for your export.
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                <div className="rounded-lg border bg-muted/40 px-3 py-2 text-xs text-muted-foreground">
                    Exporting <span className="font-semibold text-foreground">{exportCount.toLocaleString()}</span> {exportScopeLabel}.
                </div>

                <div className="space-y-3 py-4">
                    {/* XLSX Option */}
                    <button
                        type="button"
                        className="w-full rounded-xl border-2 border-slate-200 bg-white p-4 text-left transition-all hover:border-primary hover:bg-slate-50"
                        onClick={onSelectXLSX}
                    >
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0">
                                <FileSpreadsheet className="h-5 w-5 text-emerald-600" />
                            </div>
                            <div className="flex-1">
                                <div className="font-semibold text-sm mb-1 text-slate-900">Excel (XLSX)</div>
                                <div className="text-xs text-slate-600">
                                    Best for analysis with a metadata tab and optimized columns.
                                </div>
                            </div>
                            <span className="mt-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold uppercase text-emerald-700">
                                Recommended
                            </span>
                        </div>
                    </button>

                    {/* CSV Option */}
                    <button
                        type="button"
                        className="w-full rounded-xl border-2 border-slate-200 bg-white p-4 text-left transition-all hover:border-primary hover:bg-slate-50"
                        onClick={onSelectCSV}
                    >
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                                <FileText className="h-5 w-5 text-blue-600" />
                            </div>
                            <div className="flex-1">
                                <div className="font-semibold text-sm mb-1 text-slate-900">CSV (Comma-Separated)</div>
                                <div className="text-xs text-slate-600">
                                    Lightweight format that opens anywhere, ideal for quick imports.
                                </div>
                            </div>
                        </div>
                    </button>
                </div>

                <DialogFooter className="flex-col sm:flex-row gap-2">
                    <Button
                        variant="outline"
                        onClick={onBack}
                        className="w-full sm:w-auto gap-2"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back
                    </Button>
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
