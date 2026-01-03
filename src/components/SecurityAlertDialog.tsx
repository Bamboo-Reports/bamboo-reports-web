import { useState } from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from './ui/alert-dialog';
import { AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SecurityAlertDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    downloadInfo: {
        documentTitle: string;
        downloadedAt: string;
        device?: string;
        browser?: string;
        ipAddress?: string;
    };
}

export function SecurityAlertDialog({
    open,
    onOpenChange,
    downloadInfo,
}: SecurityAlertDialogProps) {
    const navigate = useNavigate();

    const handleChangePassword = () => {
        onOpenChange(false);
        // Navigate to profile page where user can change password
        navigate('/profile');
    };

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                            <AlertTriangle className="h-6 w-6 text-red-600" />
                        </div>
                        <div>
                            <AlertDialogTitle>This wasn't me</AlertDialogTitle>
                            <AlertDialogDescription className="text-xs mt-1">
                                Report a download you don't recognize
                            </AlertDialogDescription>
                        </div>
                    </div>
                </AlertDialogHeader>

                <div className="space-y-4">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <h4 className="font-semibold text-sm text-red-900 mb-2">Download Details</h4>
                        <dl className="space-y-1 text-sm">
                            <div className="flex justify-between">
                                <dt className="text-red-700">Document:</dt>
                                <dd className="font-medium text-red-900">{downloadInfo.documentTitle}</dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="text-red-700">When:</dt>
                                <dd className="font-medium text-red-900">{downloadInfo.downloadedAt}</dd>
                            </div>
                            {downloadInfo.device && (
                                <div className="flex justify-between">
                                    <dt className="text-red-700">Device:</dt>
                                    <dd className="font-medium text-red-900">{downloadInfo.device}</dd>
                                </div>
                            )}
                            {downloadInfo.browser && (
                                <div className="flex justify-between">
                                    <dt className="text-red-700">Browser:</dt>
                                    <dd className="font-medium text-red-900">{downloadInfo.browser}</dd>
                                </div>
                            )}
                            {downloadInfo.ipAddress && (
                                <div className="flex justify-between">
                                    <dt className="text-red-700">IP Address:</dt>
                                    <dd className="font-medium text-red-900">{downloadInfo.ipAddress}</dd>
                                </div>
                            )}
                        </dl>
                    </div>

                    <AlertDialogDescription className="text-sm leading-relaxed">
                        If you didn't make this download, your account may have been compromised.
                        We strongly recommend changing your password immediately to secure your account.
                    </AlertDialogDescription>

                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                        <p className="text-xs text-amber-800">
                            <strong>Security Tip:</strong> Use a strong, unique password and enable two-factor
                            authentication if available.
                        </p>
                    </div>
                </div>

                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleChangePassword}
                        className="bg-red-600 hover:bg-red-700 text-white"
                    >
                        Change Password Now
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
