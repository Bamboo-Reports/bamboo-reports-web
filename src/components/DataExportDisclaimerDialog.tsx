import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { Download, ShieldCheck, AlertCircle, ArrowLeft } from 'lucide-react';

interface DataExportDisclaimerDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: () => void;
    onBack: () => void;
    exportCount: number;
    exportFormat: 'xlsx' | 'csv';
    isExporting: boolean;
}

export function DataExportDisclaimerDialog({
    open,
    onOpenChange,
    onConfirm,
    onBack,
    exportCount,
    exportFormat,
    isExporting,
}: DataExportDisclaimerDialogProps) {
    const [agreed, setAgreed] = useState(false);

    const handleConfirm = () => {
        if (agreed) {
            onConfirm();
        }
    };

    // Reset checkbox when dialog closes
    const handleOpenChange = (newOpen: boolean) => {
        if (!newOpen) {
            setAgreed(false);
        }
        onOpenChange(newOpen);
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent className="sm:max-w-lg">
                <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 font-semibold text-primary">
                        Step 3 of 3
                    </span>
                    <span>License</span>
                </div>

                <DialogHeader>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <ShieldCheck className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                            <DialogTitle className="text-left">Confirm Export</DialogTitle>
                            <DialogDescription className="text-left text-xs mt-1">
                                {exportCount.toLocaleString()} {exportCount === 1 ? 'company' : 'companies'} • {exportFormat.toUpperCase()} format
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                <div className="rounded-lg border bg-muted/40 px-3 py-2 text-xs text-muted-foreground">
                    <div className="flex items-center justify-between">
                        <span>Records</span>
                        <span className="font-semibold text-foreground">{exportCount.toLocaleString()}</span>
                    </div>
                    <div className="mt-1 flex items-center justify-between">
                        <span>Format</span>
                        <span className="font-semibold text-foreground">{exportFormat.toUpperCase()}</span>
                    </div>
                </div>

                <div className="space-y-4 py-4">
                    {/* Important Notice */}
                    <div className="flex gap-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                        <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                        <div className="space-y-1">
                            <p className="text-sm font-medium text-amber-900">
                                Licensed Data Export
                            </p>
                            <p className="text-xs text-amber-700 leading-relaxed">
                                This data is exclusively licensed to you for personal use only.
                                Unauthorized sharing, distribution, or commercial use is strictly prohibited.
                            </p>
                        </div>
                    </div>

                    <div className="text-xs text-muted-foreground">
                        {exportFormat === 'xlsx'
                            ? 'Your XLSX export includes a Disclaimer sheet as the first tab.'
                            : 'CSV exports are delivered as raw data; keep this confirmation for compliance.'}
                    </div>

                    {/* Terms Acknowledgment */}
                    <div className="flex items-start space-x-3 p-4 bg-muted/50 rounded-lg border">
                        <Checkbox
                            id="terms"
                            checked={agreed}
                            onCheckedChange={(checked) => setAgreed(checked === true)}
                            className="mt-1"
                        />
                        <div className="flex-1">
                            <Label
                                htmlFor="terms"
                                className="text-sm font-medium leading-relaxed cursor-pointer"
                            >
                                I acknowledge that this data export is licensed exclusively for my personal use.
                                I will not redistribute, share, copy, or publicly display this data in any form.
                            </Label>
                        </div>
                    </div>
                </div>

                <DialogFooter className="flex-col sm:flex-row gap-2">
                    <Button
                        variant="outline"
                        onClick={onBack}
                        disabled={isExporting}
                        className="w-full sm:w-auto gap-2"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => handleOpenChange(false)}
                        disabled={isExporting}
                        className="w-full sm:w-auto"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleConfirm}
                        disabled={!agreed || isExporting}
                        className="w-full sm:w-auto"
                    >
                        <Download className="h-4 w-4 mr-2" />
                        {isExporting ? 'Exporting...' : 'Export Now'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
