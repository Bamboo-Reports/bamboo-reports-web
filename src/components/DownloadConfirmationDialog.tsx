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
import { Download, ShieldCheck, AlertCircle } from 'lucide-react';

interface DownloadConfirmationDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: () => void;
    documentTitle: string;
    isDownloading: boolean;
}

export function DownloadConfirmationDialog({
    open,
    onOpenChange,
    onConfirm,
    documentTitle,
    isDownloading,
}: DownloadConfirmationDialogProps) {
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
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <ShieldCheck className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                            <DialogTitle className="text-left">Confirm Download</DialogTitle>
                            <DialogDescription className="text-left text-xs mt-1">
                                {documentTitle}
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    {/* Important Notice */}
                    <div className="flex gap-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                        <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                        <div className="space-y-1">
                            <p className="text-sm font-medium text-amber-900">
                                Licensed Document
                            </p>
                            <p className="text-xs text-amber-700 leading-relaxed">
                                This document is exclusively licensed to you for personal use only.
                                Unauthorized sharing or distribution is prohibited.
                            </p>
                        </div>
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
                                I acknowledge that this document is licensed exclusively for my personal use.
                                I will not redistribute, share, copy, or publicly display this document in any form.
                            </Label>
                        </div>
                    </div>
                </div>

                <DialogFooter className="flex-col sm:flex-row gap-2">
                    <Button
                        variant="outline"
                        onClick={() => handleOpenChange(false)}
                        disabled={isDownloading}
                        className="w-full sm:w-auto"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleConfirm}
                        disabled={!agreed || isDownloading}
                        className="w-full sm:w-auto"
                    >
                        <Download className="h-4 w-4 mr-2" />
                        {isDownloading ? 'Downloading...' : 'Download Now'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
