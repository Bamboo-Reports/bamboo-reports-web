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
        return <Code className="h-5 w-5 text-blue-600" />;
    }
    if (categoryLower.includes('er&d') || categoryLower.includes('engineering')) {
        return <Settings className="h-5 w-5 text-purple-600" />;
    }
    if (categoryLower.includes('fna') || categoryLower.includes('finance') || categoryLower.includes('accounting')) {
        return <DollarSign className="h-5 w-5 text-green-600" />;
    }
    if (categoryLower.includes('procurement') || categoryLower.includes('supply chain')) {
        return <Package className="h-5 w-5 text-orange-600" />;
    }
    if (categoryLower.includes('sales') || categoryLower.includes('marketing')) {
        return <TrendingUp className="h-5 w-5 text-pink-600" />;
    }
    if (categoryLower.includes('customer') || categoryLower.includes('support')) {
        return <Headphones className="h-5 w-5 text-indigo-600" />;
    }
    if (categoryLower.includes('security') || categoryLower.includes('cyber')) {
        return <Shield className="h-5 w-5 text-red-600" />;
    }
    if (categoryLower.includes('data') || categoryLower.includes('analytics')) {
        return <Database className="h-5 w-5 text-cyan-600" />;
    }
    if (categoryLower.includes('cloud')) {
        return <Cloud className="h-5 w-5 text-sky-600" />;
    }
    if (categoryLower.includes('ai') || categoryLower.includes('artificial intelligence')) {
        return <Cpu className="h-5 w-5 text-violet-600" />;
    }

    // Default icon
    return <Briefcase className="h-5 w-5 text-gray-600" />;
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
                        </div>
                    </div>

                    {/* Services Offered Section */}
                    {serviceCategories.length > 0 && (
                        <>
                            <Separator />
                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <Briefcase className="h-5 w-5 text-primary" />
                                    <h3 className="text-lg font-semibold text-primary">Services Offered</h3>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {serviceCategories.map((service, index) => (
                                        <div
                                            key={index}
                                            className={`p-4 rounded-lg border ${getServiceColor(service.category)} transition-all hover:shadow-md`}
                                        >
                                            <div className="flex items-center gap-2 mb-3">
                                                {getServiceIcon(service.category)}
                                                <h4 className="font-semibold text-gray-900">{service.category}</h4>
                                            </div>

                                            {service.items.length > 0 && (
                                                <ul className="space-y-1.5">
                                                    {service.items.map((item, idx) => (
                                                        <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                                                            <span className="text-gray-400 mt-1">•</span>
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
