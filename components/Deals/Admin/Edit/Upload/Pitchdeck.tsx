import { useAuthContext } from '@/app/context';
import Upload from '@/components/Upload';
import { useSupabase } from '@/lib/supabase-provider';
import { useEffect, useState } from 'react';

export default function UploadPitchdeck({
  dealId
}: {
  dealId: string | undefined;
}) {
  const { notify, user } = useAuthContext();
  const { supabase } = useSupabase();
  const [loading, setLoading] = useState<boolean>(true);
  const [file, setFile] = useState<File | any>(null);

  const path = `/Documents/Deals/${dealId}/pitchdeck.pdf`;

  const deletePitchdeck = async () => {
    if (!dealId) return;
    if (file) {
      try {
        setLoading(true);

        const { data, error } = await supabase.storage
          .from('allocations-private')
          .remove([`Documents/Deals/${dealId}/pitchdeck.pdf`]); // remove / path

        if (error)
          return notify('Sorry, pitchdeck could not be removed.', false);

        if (data) {
          const { error: errFileRef } = await supabase
            .from('files')
            .delete()
            .eq('key', path);

          if (errFileRef)
            return notify('Sorry, pitchdeck could not be removed.', false);

          setFile(null);
          return notify('Pitchdeck successfully removed.', true);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const uploadPitchdeck = async (_file: File) => {
    if (!dealId && !_file) return;
    if (_file) {
      try {
        setLoading(true);

        const { data, error } = await supabase.storage
          .from('allocations-private')
          .upload(path, _file);

        if (error) return notify('Sorry, pitchdeck upload failed.', false);

        if (data) {
          const { data: filesRef, error: errFiles } = await supabase
            .from('files')
            .insert({
              file_name: 'pitchdeck.pdf',
              content_type: 'application/pdf',
              user_email: user.email,
              user_id: user.id,
              key: path,
              type: 'pitch-deck'
            })
            .select()
            .single();

          // if (filesRef) {
          //   const { error: errDealFiles } = await supabase
          //     .from('deals_files')
          //     .insert({
          //       deals_id: dealId,
          //       files_id: filesRef.id
          //     });

          //   if (errDealFiles)
          //     return notify('Sorry, pitchdeck upload failed.', false);
          // }

          if (errFiles) return notify('Sorry, pitchdeck upload failed.', false);

          return notify('Pitchdeck successfully uploaded.', true);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const getPitchdeck = async () => {
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
    getPitchdeck();
  }, []);

  useEffect(() => {
    console.log(file);
  }, [file]);

  return (
    <div className="mb-6">
      <div className="mb-4">
        <h2 className="text-xl">Upload pitch deck</h2>
        <p>Format allowed is PDF. Max size: 50mb.</p>
      </div>
      <Upload
        loading={loading}
        initialFiles={file ? [file] : []}
        disabled={file ? true : false}
        onFileAdd={async (_file: File) => {
          setFile(_file);
          await uploadPitchdeck(_file);
        }}
        onFileRemove={() => {
          deletePitchdeck();
        }}
      />
    </div>
  );
}
