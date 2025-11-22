import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { FileText, Eye, Database } from 'lucide-react';
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
  const [documents, setDocuments] = useState<PlanDocument[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewingTable, setViewingTable] = useState(false);
  const [viewingPDF, setViewingPDF] = useState<{ url: string; title: string } | null>(null);

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

  // View PDF in secure viewer
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
        setViewingPDF({ url: data.signedUrl, title: document.title });
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

  // If viewing PDF
  if (viewingPDF && user?.email) {
    return (
      <SecurePDFViewer
        fileUrl={viewingPDF.url}
        userEmail={user.email}
        onClose={() => setViewingPDF(null)}
      />
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
