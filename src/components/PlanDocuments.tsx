import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { FileText, Eye, Database, ArrowLeft } from 'lucide-react';
import { GCCCompaniesTable } from './GCCCompaniesTable';
import { SecurePDFViewer } from './SecurePDFViewer';

interface PlanDocument {
  id: string;
  plan_name: string;
  document_type: 'pdf' | 'table';
  title: string;
  description: string | null;
  file_path: string | null;
  storage_bucket: string | null;
  display_order: number;
}

interface PlanDocumentsProps {
  planName: string;
}

export function PlanDocuments({ planName }: PlanDocumentsProps) {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [documents, setDocuments] = useState<PlanDocument[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isPdfLoading, setIsPdfLoading] = useState(false);

  // CRITICAL: Read URL params directly from window.location to avoid React Router sync issues
  // This ensures we ALWAYS have the correct URL state, even during tab switches
  const getUrlParams = () => {
    const params = new URLSearchParams(window.location.search);
    return {
      view: params.get('view'),
      doc: params.get('doc')
    };
  };

  // Get current view from URL - use direct URL reading as source of truth
  const { view: currentView, doc: currentDocId } = getUrlParams();

  // DEBUG: Log component render state
  console.log('📄 [PlanDocuments] RENDER:', {
    planName,
    currentView,
    currentDocId,
    documentsCount: documents.length,
    isLoading,
    hasPdfUrl: !!pdfUrl,
    timestamp: new Date().toISOString()
  });

  // Fetch plan documents
  useEffect(() => {
    console.log('🔄 [PlanDocuments] Fetch documents effect triggered for plan:', planName);
    async function fetchDocuments() {
      try {
        setIsLoading(true);
        setError(null);

        const { data, error: fetchError } = await supabase
          .from('plan_documents')
          .select('*')
          .eq('plan_name', planName)
          .eq('is_active', true)
          .order('display_order', { ascending: true });

        if (fetchError) {
          throw fetchError;
        }

        setDocuments(data || []);
      } catch (err) {
        console.error('Error fetching plan documents:', err);
        setError(err instanceof Error ? err.message : 'Failed to load documents');
      } finally {
        setIsLoading(false);
      }
    }

    fetchDocuments();
  }, [planName]);

  // Fetch PDF URL when viewing a PDF
  useEffect(() => {
    async function fetchPDFUrl() {
      if (currentView !== 'pdf' || !currentDocId) {
        // Only clear PDF URL if we're not viewing a PDF
        if (currentView !== 'pdf') {
          setPdfUrl(null);
          setIsPdfLoading(false);
        }
        return;
      }

      // If documents aren't loaded yet, wait
      if (documents.length === 0) {
        setIsPdfLoading(true);
        return;
      }

      const document = documents.find(d => d.id === currentDocId);
      if (!document?.file_path || !document?.storage_bucket) {
        setIsPdfLoading(false);
        return;
      }

      // Set loading state
      setIsPdfLoading(true);

      try {
        const { data, error } = await supabase.storage
          .from(document.storage_bucket)
          .createSignedUrl(document.file_path, 3600);

        if (error) throw error;
        if (data?.signedUrl) {
          setPdfUrl(data.signedUrl);
        }
      } catch (err) {
        console.error('Error fetching PDF URL:', err);
        setError(err instanceof Error ? err.message : 'Failed to load PDF');
      } finally {
        setIsPdfLoading(false);
      }
    }

    fetchPDFUrl();
  }, [currentView, currentDocId, documents.length]);

  // Navigate to PDF view
  const handleView = (document: PlanDocument) => {
    // Clear previous PDF URL and set loading state
    setPdfUrl(null);
    setIsPdfLoading(true);

    const params = new URLSearchParams(searchParams);
    params.set('view', 'pdf');
    params.set('doc', document.id);
    setSearchParams(params);
  };

  // Navigate to table view
  const handleViewTable = () => {
    const params = new URLSearchParams(searchParams);
    params.set('view', 'table');
    params.delete('doc');
    setSearchParams(params);
  };

  // Navigate back to document list
  const handleBack = () => {
    const params = new URLSearchParams(searchParams);
    params.delete('view');
    params.delete('doc');
    setSearchParams(params);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your content...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-800">Error: {error}</p>
      </div>
    );
  }

  if (documents.length === 0) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-yellow-800">No documents available for {planName}</p>
      </div>
    );
  }

  // If we're in PDF view mode, ALWAYS show PDF viewer or loading state (never document list)
  if (currentView === 'pdf' && currentDocId) {
    // If we have the PDF URL and user email, show the viewer
    if (pdfUrl && user?.email) {
      const currentDoc = documents.find(d => d.id === currentDocId);
      return (
        <SecurePDFViewer
          fileUrl={pdfUrl}
          userEmail={user.email}
          onClose={handleBack}
          documentTitle={currentDoc?.title}
        />
      );
    }

    // Otherwise, show loading screen (even if isPdfLoading is false)
    // This ensures we NEVER show the document list when view=pdf is in URL
    return (
      <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
        <div className="text-center p-12 bg-zinc-950/50 backdrop-blur-xl rounded-2xl border border-zinc-800/50">
          <div className="relative w-16 h-16 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full border-4 border-zinc-800"></div>
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-emerald-500 animate-spin"></div>
          </div>
          <p className="text-zinc-300 font-medium">Loading document...</p>
          <p className="text-zinc-500 text-sm mt-2">Please wait</p>
        </div>
      </div>
    );
  }

  // If viewing GCC table
  if (currentView === 'table') {
    return (
      <div>
        <Button
          variant="outline"
          onClick={handleBack}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Documents
        </Button>
        <GCCCompaniesTable />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">{planName} - Your Content</h2>
        <p className="text-gray-600">Access all your purchased documents and data below</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {documents.map((document) => (
          <Card key={document.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  {document.document_type === 'pdf' ? (
                    <FileText className="h-5 w-5 text-red-600" />
                  ) : (
                    <Database className="h-5 w-5 text-blue-600" />
                  )}
                  <CardTitle className="text-lg">{document.title}</CardTitle>
                </div>
              </div>
              {document.description && (
                <CardDescription>{document.description}</CardDescription>
              )}
            </CardHeader>
            <CardContent>
              {document.document_type === 'pdf' ? (
                <Button
                  className="w-full"
                  onClick={() => handleView(document)}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View Document
                </Button>
              ) : (
                <Button
                  className="w-full"
                  onClick={handleViewTable}
                >
                  <Database className="h-4 w-4 mr-2" />
                  View Database
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
