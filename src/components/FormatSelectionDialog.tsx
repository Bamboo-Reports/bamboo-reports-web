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
}

export function FormatSelectionDialog({
    open,
    onOpenChange,
    onSelectXLSX,
    onSelectCSV,
    onBack,
}: FormatSelectionDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <FileSpreadsheet className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                            <DialogTitle className="text-left">Choose Format</DialogTitle>
                            <DialogDescription className="text-left text-xs mt-1">
                                Select your preferred export format
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                <div className="space-y-3 py-4">
                    {/* XLSX Option */}
                    <Button
                        variant="outline"
                        className="w-full h-auto flex items-start gap-3 p-4 hover:bg-primary/5 hover:border-primary transition-all"
                        onClick={onSelectXLSX}
                    >
                        <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0">
                            <FileSpreadsheet className="h-5 w-5 text-emerald-600" />
                        </div>
                        <div className="flex-1 text-left">
                            <div className="font-semibold text-sm mb-1">Excel (XLSX)</div>
                            <div className="text-xs text-muted-foreground">
                                Recommended format with metadata sheet and auto-sized columns
                            </div>
                        </div>
                    </Button>

                    {/* CSV Option */}
                    <Button
                        variant="outline"
                        className="w-full h-auto flex items-start gap-3 p-4 hover:bg-primary/5 hover:border-primary transition-all"
                        onClick={onSelectCSV}
                    >
                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                            <FileText className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="flex-1 text-left">
                            <div className="font-semibold text-sm mb-1">CSV (Comma-Separated)</div>
                            <div className="text-xs text-muted-foreground">
                                Universal format, compatible with all spreadsheet software
                            </div>
                        </div>
                    </Button>
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
