import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { FileText, Download, Eye, Database } from 'lucide-react';
import { GCCCompaniesTable } from './GCCCompaniesTable';

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
  const [documents, setDocuments] = useState<PlanDocument[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [downloadingDoc, setDownloadingDoc] = useState<string | null>(null);
  const [viewingTable, setViewingTable] = useState(false);

  // Fetch plan documents
  useEffect(() => {
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

  // Download PDF document
  const handleDownload = async (document: PlanDocument) => {
    if (!document.file_path || !document.storage_bucket) {
      console.error('Invalid document configuration');
      return;
    }

    try {
      setDownloadingDoc(document.id);

      // Download file from Supabase Storage
      const { data, error: downloadError } = await supabase.storage
        .from(document.storage_bucket)
        .download(document.file_path);

      if (downloadError) {
        throw downloadError;
      }

      // Create a blob URL and trigger download
      const blob = new Blob([data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const a = window.document.createElement('a');
      a.href = url;
      a.download = document.file_path.split('/').pop() || 'document.pdf';
      window.document.body.appendChild(a);
      a.click();
      window.document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error downloading document:', err);
      alert(err instanceof Error ? err.message : 'Failed to download document');
    } finally {
      setDownloadingDoc(null);
    }
  };

  // View PDF in new tab
  const handleView = async (document: PlanDocument) => {
    if (!document.file_path || !document.storage_bucket) {
      console.error('Invalid document configuration');
      return;
    }

    try {
      // Get signed URL for the file (valid for 1 hour)
      const { data, error } = await supabase.storage
        .from(document.storage_bucket)
        .createSignedUrl(document.file_path, 3600);

      if (error) {
        throw error;
      }

      if (data?.signedUrl) {
        window.open(data.signedUrl, '_blank');
      }
    } catch (err) {
      console.error('Error viewing document:', err);
      alert(err instanceof Error ? err.message : 'Failed to view document');
    }
  };

  // Handle viewing GCC table
  const handleViewTable = () => {
    setViewingTable(true);
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

  // If viewing GCC table
  if (viewingTable) {
    return (
      <div>
        <Button
          variant="outline"
          onClick={() => setViewingTable(false)}
          className="mb-4"
        >
          ← Back to Documents
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
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => handleView(document)}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={() => handleDownload(document)}
                    disabled={downloadingDoc === document.id}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    {downloadingDoc === document.id ? 'Downloading...' : 'Download'}
                  </Button>
                </div>
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
