import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from './ui/dialog';
import { Badge } from './ui/badge';
import { ExternalLink, Building2, MapPin, Globe, Briefcase } from 'lucide-react';
import { Separator } from './ui/separator';

interface GCCCompany {
    id: string;
    account_global_legal_name: string;
    revenue_range: string | null;
    hq_country: string | null;
    hq_region: string | null;
    website: string | null;
    industry: string | null;
    category: string | null;
    total_centers: number | null;
    total_gcc_centers: number | null;
    india_employees_range: string | null;
    established_in_india: string | null;
    years_in_india: string | null;
    primary_city: string | null;
    secondary_city: string | null;
    services_offered: string | null;
}

interface CompanyDetailViewProps {
    company: GCCCompany | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function CompanyDetailView({ company, open, onOpenChange }: CompanyDetailViewProps) {
    if (!company) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold flex items-center gap-3">
                        <Building2 className="h-6 w-6 text-primary" />
                        {company.account_global_legal_name}
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-6 mt-4">
                    {/* Section A: Account Specific Details */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <h3 className="text-lg font-semibold text-primary">Account Specific Details</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-5 rounded-lg border">
                            <DetailItem
                                icon={<Building2 className="h-4 w-4" />}
                                label="Account Global Legal Name"
                                value={company.account_global_legal_name}
                            />

                            <DetailItem
                                icon={<Briefcase className="h-4 w-4" />}
                                label="Revenue Range"
                                value={company.revenue_range}
                                badge
                            />

                            <DetailItem
                                icon={<MapPin className="h-4 w-4" />}
                                label="HQ Country"
                                value={company.hq_country}
                            />

                            <DetailItem
                                icon={<Globe className="h-4 w-4" />}
                                label="HQ Region"
                                value={company.hq_region}
                            />

                            <DetailItem
                                icon={<Globe className="h-4 w-4" />}
                                label="Website"
                                value={company.website}
                                link
                            />

                            <DetailItem
                                icon={<Briefcase className="h-4 w-4" />}
                                label="Industry"
                                value={company.industry}
                            />

                            <DetailItem
                                icon={<Building2 className="h-4 w-4" />}
                                label="Category"
                                value={company.category}
                                badge
                            />
                        </div>
                    </div>

                    <Separator />

                    {/* Section B: Account Center Specific Details */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <h3 className="text-lg font-semibold text-primary">Account Center Specific Details</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-5 rounded-lg border">
                            <DetailItem
                                icon={<Building2 className="h-4 w-4" />}
                                label="Total Centers"
                                value={company.total_centers?.toString()}
                                badge
                            />

                            <DetailItem
                                icon={<Building2 className="h-4 w-4" />}
                                label="Total GCC Centers"
                                value={company.total_gcc_centers?.toString()}
                                badge
                            />

                            <DetailItem
                                icon={<Briefcase className="h-4 w-4" />}
                                label="India Employees Range"
                                value={company.india_employees_range}
                            />

                            <DetailItem
                                icon={<Building2 className="h-4 w-4" />}
                                label="Established In India"
                                value={company.established_in_india}
                            />

                            <DetailItem
                                icon={<Building2 className="h-4 w-4" />}
                                label="Years in India"
                                value={company.years_in_india}
                            />

                            <DetailItem
                                icon={<MapPin className="h-4 w-4" />}
                                label="Primary City"
                                value={company.primary_city}
                            />

                            <DetailItem
                                icon={<MapPin className="h-4 w-4" />}
                                label="Secondary City"
                                value={company.secondary_city}
                                multiline
                            />

                            <DetailItem
                                icon={<Briefcase className="h-4 w-4" />}
                                label="Services Offered"
                                value={company.services_offered}
                                multiline
                                fullWidth
                            />
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

interface DetailItemProps {
    icon: React.ReactNode;
    label: string;
    value: string | null | undefined;
    badge?: boolean;
    link?: boolean;
    multiline?: boolean;
    fullWidth?: boolean;
}

function DetailItem({ icon, label, value, badge, link, multiline, fullWidth }: DetailItemProps) {
    const displayValue = value || '-';
    const colSpan = fullWidth ? 'md:col-span-2' : '';

    return (
        <div className={`space-y-1.5 ${colSpan}`}>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                {icon}
                <span>{label}</span>
            </div>
            <div className="text-sm font-medium">
                {link && value ? (
                    <a
                        href={value.startsWith('http') ? value : `https://${value}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-800 hover:underline"
                    >
                        {displayValue}
                        <ExternalLink className="h-3 w-3" />
                    </a>
                ) : badge && value ? (
                    <Badge variant="secondary" className="font-medium">
                        {displayValue}
                    </Badge>
                ) : multiline && value ? (
                    <div className="whitespace-pre-line text-sm leading-relaxed bg-white p-3 rounded border">
                        {displayValue}
                    </div>
                ) : (
                    <span className="text-gray-900">{displayValue}</span>
                )}
            </div>
        </div>
    );
}
