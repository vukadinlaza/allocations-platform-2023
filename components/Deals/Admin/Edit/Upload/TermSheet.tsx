import { useAuthContext } from '@/app/context';
import Upload from '@/components/Upload';
import { useSupabase } from '@/lib/supabase-provider';
import { useEffect, useState } from 'react';

export default function UploadTermSheet({
  dealId
}: {
  dealId: string | undefined;
}) {
  const { notify, user } = useAuthContext();
  const { supabase } = useSupabase();
  const [loading, setLoading] = useState<boolean>(true);
  const [file, setFile] = useState<File | any>(null);

  const path = `/Documents/Deals/${dealId}/termsheet.pdf`;

  const deleteTermSheet = async () => {
    if (!dealId) return;
    if (file) {
      try {
        setLoading(true);

        const { data, error } = await supabase.storage
          .from('allocations-private')
          .remove([`Documents/Deals/${dealId}/termsheet.pdf`]); // remove / path

        if (error)
          return notify('Sorry, termsheet could not be removed.', false);

        if (data) {
          const { data, error: errFiles } = await supabase.rpc(
            'deals_files_delete',
            {
              file_id: file.id
            }
          );

          if (errFiles)
            return notify('Sorry, termsheet could not be removed.', false);

          setFile(null);
          return notify('Termsheet successfully removed.', true);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const uploadTermSheet = async (_file: File) => {
    if (!dealId && !_file) return;
    if (_file) {
      try {
        setLoading(true);

        const { data, error } = await supabase.storage
          .from('allocations-private')
          .upload(path, _file);

        if (error) return notify('Sorry, termsheet upload failed.', false);

        if (data) {
          const { data: filesRef, error: errFiles } = await supabase.rpc(
            'deals_files_upload',
            {
              key: path,
              type: 'term-sheet',
              file_name: 'termsheet.pdf',
              content_type: 'application/pdf',
              user_email: user.email,
              deal_id: dealId
            }
          );

          if (errFiles) return notify('Sorry, termsheet upload failed.', false);

          return notify('Termsheet successfully uploaded.', true);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const getTermSheet = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('files')
        .select('*')
        .eq('key', path)
        .single();

      if (data) {
        setFile({ ...data, name: data.file_name });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTermSheet();
  }, []);

  return (
    <div className="mb-6">
      <div className="mb-4">
        <h2 className="text-xl">Upload term sheet / purchase agreement</h2>
        <p>Format allowed is PDF. Max size: 50mb.</p>
      </div>
      <Upload
        loading={loading}
        initialFiles={file ? [file] : []}
        disabled={file ? true : false}
        onFileAdd={async (_file: File) => {
          setFile(_file);
          await uploadTermSheet(_file);
        }}
        onFileRemove={() => {
          deleteTermSheet();
        }}
      />
    </div>
  );
}
