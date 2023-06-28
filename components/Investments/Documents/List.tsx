'use client';
import Button from '@/components/Button';
import DocumentsItem from '@/components/Documents/Item';
import LoadingList from '@/components/Loading/List';
import { AllocationsAPI } from '@/lib/allocations-api';
import { useSupabase } from '@/lib/supabase-provider';
import { downloadFile, getFullName } from '@/lib/utils';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import None from '../../None';

export default function InvestmentsDocumentsList({
  investment,
  deal
}: {
  investment?: any;
  deal?: any;
}) {
  const { supabase } = useSupabase();
  const [documents, setDocuments] = useState<any>([]);
  const [documentName, setDocumentName] = useState<any>('document');
  const [loading, setLoading] = useState<boolean>(true);
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);

  const fetchDocuments = async (name = 'document') => {
    if (!investment.id) return;
    try {
      setLoading(true);

      // const { data, error } = await supabase.storage
      //   .from('allocations-private')
      //   .list(`Documents/Investments/${investment.id}`);

      const { data, error } = await supabase
        .from('investments_files')
        .select('*')
        .eq('investment_id', investment.id)
        .single();

      if (error) return console.error(error);

      setDocuments([data].map((doc) => ({ ...doc, name: `${name}.pdf` })));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setDocuments([]);
    if (investment) {
      const name = `${deal.name} — ${getFullName(investment.users)}`;
      setDocumentName(name);
      fetchDocuments(name);
    }
  }, [investment]);

  return (
    <div className="mb-2 w-96 DocumentsList">
      {loading && <LoadingList />}
      {!loading && documents.length === 0 && <None text="No documents yet." />}
      {!loading && documents.length > 0 && (
        <div className="grid gap-2">
          {documents.map((item: any, index: number) => (
            <DocumentsItem
              key={index}
              item={item}
              button={
                <Button
                  loading={buttonLoading}
                  icon={
                    <Image
                      src="/download.svg"
                      alt={'Download'}
                      className="opacity-75 invert"
                      width={24}
                      height={24}
                    />
                  }
                  onClick={async () => {
                    try {
                      setButtonLoading(true);
                      const response = await AllocationsAPI.downloadPDFFile(
                        item.file_id
                      );
                      if (response.ok) {
                        await downloadFile(
                          await response.blob(),
                          `${documentName}.pdf`
                        );
                      } else {
                        console.error('Failed to download the document');
                      }
                    } catch (error) {
                      console.log(error);
                    } finally {
                      setButtonLoading(false);
                    }
                  }}
                  label="Download"
                  small={true}
                />
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}
