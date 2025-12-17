import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from './ui/dialog';
import { Badge } from './ui/badge';
import {
    ExternalLink,
    Building2,
    MapPin,
    Globe,
    Briefcase,
    Code,
    Wrench,
    DollarSign,
    Package,
    TrendingUp,
    Headphones,
    Shield,
    Database,
    Cloud,
    Cpu,
    Settings
} from 'lucide-react';
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

interface ServiceCategory {
    category: string;
    items: string[];
}

// Function to parse services from multi-line text format
const parseServices = (servicesText: string | null): ServiceCategory[] => {
    if (!servicesText) return [];

    const lines = servicesText.split('\n').map(line => line.trim()).filter(Boolean);
    const categories: ServiceCategory[] = [];
    let currentCategory: ServiceCategory | null = null;

    lines.forEach(line => {
        // If line doesn't start with a dash, it's a category
        if (!line.startsWith('-')) {
            if (currentCategory) {
                categories.push(currentCategory);
            }
            currentCategory = {
                category: line,
                items: []
            };
        } else {
            // It's a sub-item, add to current category
            if (currentCategory) {
                currentCategory.items.push(line.substring(1).trim());
            }
        }
    });

    // Push the last category
    if (currentCategory) {
        categories.push(currentCategory);
    }

    return categories;
};

// Get icon for service category
const getServiceIcon = (category: string) => {
    const categoryLower = category.toLowerCase();

    if (categoryLower.includes('it') || categoryLower.includes('information technology')) {
        return <Code className="h-4 w-4 text-gray-600" />;
    }
    if (categoryLower.includes('er&d') || categoryLower.includes('engineering')) {
        return <Settings className="h-4 w-4 text-gray-600" />;
    }
    if (categoryLower.includes('fna') || categoryLower.includes('finance') || categoryLower.includes('accounting')) {
        return <DollarSign className="h-4 w-4 text-gray-600" />;
    }
    if (categoryLower.includes('procurement') || categoryLower.includes('supply chain')) {
        return <Package className="h-4 w-4 text-gray-600" />;
    }
    if (categoryLower.includes('sales') || categoryLower.includes('marketing')) {
        return <TrendingUp className="h-4 w-4 text-gray-600" />;
    }
    if (categoryLower.includes('customer') || categoryLower.includes('support')) {
        return <Headphones className="h-4 w-4 text-gray-600" />;
    }
    if (categoryLower.includes('security') || categoryLower.includes('cyber')) {
        return <Shield className="h-4 w-4 text-gray-600" />;
    }
    if (categoryLower.includes('data') || categoryLower.includes('analytics')) {
        return <Database className="h-4 w-4 text-gray-600" />;
    }
    if (categoryLower.includes('cloud')) {
        return <Cloud className="h-4 w-4 text-gray-600" />;
    }
    if (categoryLower.includes('ai') || categoryLower.includes('artificial intelligence')) {
        return <Cpu className="h-4 w-4 text-gray-600" />;
    }

    // Default icon
    return <Briefcase className="h-4 w-4 text-gray-600" />;
};

// Get background color for service category
const getServiceColor = (category: string) => {
    const categoryLower = category.toLowerCase();

    if (categoryLower.includes('it') || categoryLower.includes('information technology')) {
        return 'bg-blue-50 border-blue-200';
    }
    if (categoryLower.includes('er&d') || categoryLower.includes('engineering')) {
        return 'bg-purple-50 border-purple-200';
    }
    if (categoryLower.includes('fna') || categoryLower.includes('finance') || categoryLower.includes('accounting')) {
        return 'bg-green-50 border-green-200';
    }
    if (categoryLower.includes('procurement') || categoryLower.includes('supply chain')) {
        return 'bg-orange-50 border-orange-200';
    }
    if (categoryLower.includes('sales') || categoryLower.includes('marketing')) {
        return 'bg-pink-50 border-pink-200';
    }
    if (categoryLower.includes('customer') || categoryLower.includes('support')) {
        return 'bg-indigo-50 border-indigo-200';
    }
    if (categoryLower.includes('security') || categoryLower.includes('cyber')) {
        return 'bg-red-50 border-red-200';
    }
    if (categoryLower.includes('data') || categoryLower.includes('analytics')) {
        return 'bg-cyan-50 border-cyan-200';
    }
    if (categoryLower.includes('cloud')) {
        return 'bg-sky-50 border-sky-200';
    }
    if (categoryLower.includes('ai') || categoryLower.includes('artificial intelligence')) {
        return 'bg-violet-50 border-violet-200';
    }

    return 'bg-gray-50 border-gray-200';
};

export function CompanyDetailView({ company, open, onOpenChange }: CompanyDetailViewProps) {
    if (!company) return null;

    const serviceCategories = parseServices(company.services_offered);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto p-0 bg-white border border-slate-200/70 shadow-2xl">
                <div className="border-b border-slate-200/70 bg-slate-50/70 px-6 py-5">
                    <DialogHeader className="space-y-1">
                        <DialogTitle className="text-2xl font-semibold text-slate-900 flex items-center gap-3">
                            <Building2 className="h-6 w-6 text-slate-700" />
                            {company.account_global_legal_name}
                        </DialogTitle>
                        <div className="text-sm text-slate-600">
                            {company.hq_country || 'HQ location unavailable'}
                            {company.category ? ` | ${company.category}` : ''}
                        </div>
                    </DialogHeader>
                </div>

                <div className="space-y-6 px-6 py-6">
                    {/* Section A: Account Specific Details */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <h3 className="text-base font-semibold text-slate-800">Account Specific Details</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-5 rounded-xl border border-slate-200/70 shadow-sm">
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
                            <h3 className="text-base font-semibold text-slate-800">Account Center Specific Details</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-5 rounded-xl border border-slate-200/70 shadow-sm">
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
                        </div>
                    </div>

                    {/* Services Offered Section */}
                    {serviceCategories.length > 0 && (
                        <>
                            <Separator />
                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <h3 className="text-base font-semibold text-slate-800">Services Offered</h3>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-white p-5 rounded-xl border border-slate-200/70 shadow-sm">
                                    {serviceCategories.map((service, index) => (
                                        <div
                                            key={index}
                                            className="space-y-2 rounded-lg border border-slate-200/70 bg-slate-50/60 p-4"
                                        >
                                            <div className="flex items-center gap-2">
                                                {getServiceIcon(service.category)}
                                                <h4 className="text-xs font-semibold text-slate-600 uppercase tracking-wide">{service.category}</h4>
                                            </div>

                                            {service.items.length > 0 && (
                                                <ul className="space-y-1">
                                                    {service.items.map((item, idx) => (
                                                        <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                                                            <span className="text-gray-400 mt-0.5">•</span>
                                                            <span>{item}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
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
            <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wide text-slate-500 font-semibold">
                <span className="text-slate-400">{icon}</span>
                <span>{label}</span>
            </div>
            <div className="text-sm font-medium text-slate-900">
                {link && value ? (
                    <a
                        href={value.startsWith('http') ? value : `https://${value}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-slate-700 hover:text-slate-900 hover:underline"
                    >
                        {displayValue}
                        <ExternalLink className="h-3 w-3" />
                    </a>
                ) : badge && value ? (
                    <Badge variant="secondary" className="font-medium bg-slate-100 text-slate-700 border border-slate-200">
                        {displayValue}
                    </Badge>
                ) : multiline && value ? (
                    <div className="whitespace-pre-line text-sm leading-relaxed text-slate-900">
                        {displayValue}
                    </div>
                ) : (
                    <span className="text-slate-900">{displayValue}</span>
                )}
            </div>
        </div>
    );
}
