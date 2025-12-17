import { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { ArrowLeft, Download, FileText, Search, TrendingUp, Files, Award, Monitor, Smartphone, AlertTriangle, MapPin } from 'lucide-react';
import { toast } from 'sonner';
import Header from '../components/Header';
import Footer from '../components/Footer';
import usePageTitle from '../hooks/usePageTitle';
import {
    fetchDownloadHistory,
    calculateDownloadStats,
    formatDownloadDate,
    parseUserAgent,
    type DownloadLog,
} from '../utils/downloadHistoryUtils';
import { SecurityAlertDialog } from '../components/SecurityAlertDialog';
import { generateDisclaimerPage } from '../utils/pdfDisclaimerGenerator';
import { mergePDFWithDisclaimer, downloadPDF } from '../utils/pdfMerger';
import { getIPInfo, formatLocation } from '../utils/ipUtils';
import { supabase } from '../lib/supabase';

export default function DownloadHistory() {
    usePageTitle('Download History');
    const navigate = useNavigate();
    const { user } = useAuth();
    const [downloads, setDownloads] = useState<DownloadLog[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [redownloadingId, setRedownloadingId] = useState<string | null>(null);
    const [showSecurityAlert, setShowSecurityAlert] = useState(false);
    const [selectedDownloadForReport, setSelectedDownloadForReport] = useState<DownloadLog | null>(null);

    // Filters
    const [searchQuery, setSearchQuery] = useState('');
    const [dateRange, setDateRange] = useState<'today' | '7days' | '30days' | 'all'>('all');
    const [planFilter, setPlanFilter] = useState<string>('all');

    // Redirect to sign-in if not authenticated
    if (!user) {
        return <Navigate to="/signin" replace />;
    }

    // Fetch download history
    useEffect(() => {
        async function loadHistory() {
            try {
                setIsLoading(true);
                setError(null);

                const { data, error: fetchError } = await fetchDownloadHistory(user.id, {
                    searchQuery,
                    dateRange,
                    planName: planFilter !== 'all' ? planFilter : undefined,
                });

                if (fetchError) {
                    throw fetchError;
                }

                setDownloads(data || []);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load download history');
            } finally {
                setIsLoading(false);
            }
        }

        loadHistory();
    }, [user.id, searchQuery, dateRange, planFilter]);

    // Calculate stats
    const stats = calculateDownloadStats(downloads);

    // Get unique plan names for filter
    const uniquePlans = Array.from(new Set(downloads.map((d) => d.plan_name)));

    // Handle re-download
    const handleRedownload = async (download: DownloadLog) => {
        try {
            setRedownloadingId(download.id);
            toast.info('Preparing your download...');

            // Get user's full name
            const userName = user.user_metadata?.full_name || 'User';

            // Generate current date
            const now = new Date();
            const dateGenerated = now.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            });
            const generatedAt = now.toLocaleString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                timeZoneName: 'short',
            });

            // Generate disclaimer page
            const disclaimerBytes = await generateDisclaimerPage({
                reportTitle: download.document_title,
                dateGenerated,
                generatedAt,
                planName: download.plan_name,
                documentId: download.document_id,
                userName,
                userEmail: user.email!,
            });

            // Get document details to fetch PDF
            const { data: docData, error: docError } = await supabase
                .from('plan_documents')
                .select('file_path, storage_bucket')
                .eq('id', download.document_id)
                .single();

            if (docError || !docData?.file_path || !docData?.storage_bucket) {
                throw new Error('Failed to access document');
            }

            // Get signed URL for original PDF
            const { data: urlData, error: urlError } = await supabase.storage
                .from(docData.storage_bucket)
                .createSignedUrl(docData.file_path, 3600);

            if (urlError || !urlData?.signedUrl) {
                throw new Error('Failed to access document');
            }

            // Merge disclaimer with original PDF
            const mergedPdfBlob = await mergePDFWithDisclaimer(
                disclaimerBytes,
                urlData.signedUrl
            );

            // Generate filename
            const filename = `${download.document_title.replace(/[^a-z0-9]/gi, '_')}_${download.plan_name}.pdf`;

            // Download the merged PDF
            downloadPDF(mergedPdfBlob, filename);

            // Log the re-download
            try {
                const ipInfo = await getIPInfo();
                await supabase.from('download_logs').insert({
                    user_id: user.id,
                    user_email: user.email,
                    document_id: download.document_id,
                    document_title: download.document_title,
                    plan_name: download.plan_name,
                    user_agent: navigator.userAgent,
                    ip_address: ipInfo?.ip || null,
                });
            } catch (logError) {
                console.error('Failed to log re-download:', logError);
            }

            toast.success('Download complete!');
        } catch (err) {
            toast.error(err instanceof Error ? err.message : 'Failed to download document');
        } finally {
            setRedownloadingId(null);
        }
    };

    // Handle security report
    const handleReportSuspicious = (download: DownloadLog) => {
        setSelectedDownloadForReport(download);
        setShowSecurityAlert(true);
    };

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="py-16 sm:py-20 px-3 sm:px-4">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="mb-6 sm:mb-8">
                        <Button
                            variant="ghost"
                            onClick={() => navigate(-1)}
                            className="mb-3 sm:mb-4 -ml-2 sm:-ml-4 text-xs sm:text-sm"
                            size="sm"
                        >
                            <ArrowLeft className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                            Back
                        </Button>
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground flex items-center gap-2 sm:gap-3">
                            <Download className="h-7 w-7 sm:h-9 sm:w-9 lg:h-10 lg:w-10 text-primary" />
                            Download History
                        </h1>
                        <p className="text-muted-foreground mt-1 sm:mt-2 text-sm sm:text-base lg:text-lg">
                            Track all your downloaded reports and documents
                        </p>
                    </div>

                    {/* Stats Cards */}
                    {!isLoading && downloads.length > 0 && (
                        <div className="grid gap-4 md:grid-cols-3 mb-6">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Total Downloads</CardTitle>
                                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{stats.totalDownloads}</div>
                                    <p className="text-xs text-muted-foreground">All time</p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Unique Documents</CardTitle>
                                    <Files className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{stats.uniqueDocuments}</div>
                                    <p className="text-xs text-muted-foreground">Different reports</p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Most Downloaded</CardTitle>
                                    <Award className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-sm font-bold truncate">
                                        {stats.mostDownloaded?.title || '-'}
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        {stats.mostDownloaded ? `${stats.mostDownloaded.count} times` : 'No downloads yet'}
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    {/* Filters */}
                    <div className="bg-card border rounded-lg p-4 mb-6">
                        <div className="grid gap-4 md:grid-cols-3">
                            {/* Search */}
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search documents..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-9"
                                />
                            </div>

                            {/* Date Range Filter */}
                            <Select value={dateRange} onValueChange={(value: any) => setDateRange(value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Date range" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All time</SelectItem>
                                    <SelectItem value="today">Today</SelectItem>
                                    <SelectItem value="7days">Last 7 days</SelectItem>
                                    <SelectItem value="30days">Last 30 days</SelectItem>
                                </SelectContent>
                            </Select>

                            {/* Plan Filter */}
                            <Select value={planFilter} onValueChange={setPlanFilter}>
                                <SelectTrigger>
                                    <SelectValue placeholder="All plans" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All plans</SelectItem>
                                    {uniquePlans.map((plan) => (
                                        <SelectItem key={plan} value={plan}>
                                            {plan}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Download List */}
                    <div className="bg-card border rounded-lg">
                        {isLoading ? (
                            <div className="flex items-center justify-center py-12">
                                <div className="text-center">
                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                                    <p className="text-muted-foreground">Loading your download history...</p>
                                </div>
                            </div>
                        ) : error ? (
                            <div className="p-8 text-center">
                                <p className="text-red-600">{error}</p>
                            </div>
                        ) : downloads.length === 0 ? (
                            <div className="p-12 text-center">
                                <Download className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                                <h3 className="text-lg font-semibold mb-2">No Downloads Yet</h3>
                                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                                    You haven't downloaded any documents yet. Visit your content page to download reports.
                                </p>
                                <Button onClick={() => navigate('/my-content')}>
                                    Browse Documents
                                </Button>
                            </div>
                        ) : (
                            <div className="divide-y">
                                {downloads.map((download) => {
                                    const deviceInfo = parseUserAgent(download.user_agent);
                                    return (
                                        <div
                                            key={download.id}
                                            className="p-4 sm:p-6 hover:bg-muted/50 transition-colors"
                                        >
                                            <div className="flex items-start justify-between gap-4">
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2 mb-1.5">
                                                        <FileText className="h-4 w-4 text-red-600 flex-shrink-0" />
                                                        <h3 className="font-medium text-sm truncate">{download.document_title}</h3>
                                                    </div>
                                                    <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">{" "}
                                                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                                                            {download.plan_name}
                                                        </span>
                                                        <span>•</span>
                                                        <span>{formatDownloadDate(download.downloaded_at)}</span>
                                                        {download.user_agent && (
                                                            <>
                                                                <span>•</span>
                                                                <span className="inline-flex items-center gap-1">
                                                                    {deviceInfo.device === 'Mobile' || deviceInfo.device === 'Tablet' ? (
                                                                        <Smartphone className="h-3 w-3" />
                                                                    ) : (
                                                                        <Monitor className="h-3 w-3" />
                                                                    )}
                                                                    <span className="text-xs">{deviceInfo.browser} on {deviceInfo.os}</span>
                                                                </span>
                                                            </>
                                                        )}
                                                        {download.ip_address && (
                                                            <>
                                                                <span>•</span>
                                                                <span className="inline-flex items-center gap-1">
                                                                    <MapPin className="h-3 w-3" />
                                                                    <span className="text-xs" title={download.ip_address}>
                                                                        {download.ip_address}
                                                                    </span>
                                                                </span>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="flex gap-2 flex-shrink-0">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => handleReportSuspicious(download)}
                                                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                                        title="Report unauthorized access"
                                                    >
                                                        <AlertTriangle className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => handleRedownload(download)}
                                                        disabled={redownloadingId === download.id}
                                                    >
                                                        <Download className="h-4 w-4 mr-2" />
                                                        {redownloadingId === download.id ? 'Downloading...' : 'Download'}
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* Security Alert Dialog */}
            {selectedDownloadForReport && (
                <SecurityAlertDialog
                    open={showSecurityAlert}
                    onOpenChange={setShowSecurityAlert}
                    downloadInfo={{
                        documentTitle: selectedDownloadForReport.document_title,
                        downloadedAt: formatDownloadDate(selectedDownloadForReport.downloaded_at),
                        device: parseUserAgent(selectedDownloadForReport.user_agent).device,
                        browser: `${parseUserAgent(selectedDownloadForReport.user_agent).browser} on ${parseUserAgent(selectedDownloadForReport.user_agent).os}`,
                        ipAddress: selectedDownloadForReport.ip_address || undefined,
                    }}
                />
            )}

            <Footer />
        </div>
    );
}
