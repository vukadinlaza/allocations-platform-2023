'use client';
import DocumentsItem from '@/components/Documents/Item';
import LoadingList from '@/components/Loading/List';
import { useSupabase } from '@/lib/supabase-provider';
import { useEffect, useState } from 'react';
import None from '../None';

export default function DocumentsList({
  investmentId
}: {
  investmentId?: string;
}) {
  const { supabase } = useSupabase();
  const [documents, setDocuments] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchDocuments = async () => {
    if (!investmentId) return;
    try {
      setLoading(true);

      const { data, error } = await supabase.storage
        .from('allocations-private')
        .list(`Documents/Investments/${investmentId}`);

      // const { data, error } = await supabase
      //   .from('files')
      //   .select('*')
      //   .eq('key', 'Documents/Investments/b3ec2edf-d80f-4401-8314-d8c78ad0a1e7/subscription-agreement.pdf')
      //   .single();

      if (error) return console.error(error);

      setDocuments(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, [investmentId]);

  return (
    <div className="mb-2 w-96 DocumentsList">
      {loading && <LoadingList />}
      {!loading && documents.length === 0 && <None text="No documents yet." />}
      {!loading && documents.length > 0 && (
        <div className="grid gap-2">
          {documents.map((item: any, index: number) => (
            <DocumentsItem key={index} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
