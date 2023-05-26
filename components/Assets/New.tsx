import { useAuthContext } from '@/app/context';
import Button from '@/components/Button';
import FormBuilder from '@/components/FormBuilder';
import { useSupabase } from '@/lib/supabase-provider';
import { Asset, Field } from '@/types';
import { asset_security_type, asset_type } from '@/types/values';
import { useEffect, useState } from 'react';

type Props = {
  asset?: Asset;
  dealId?: string;
  onCreate: (v: any) => any;
};

export default function NewAsset({ asset, onCreate, dealId }: Props) {
  const { supabase } = useSupabase();
  const { notify } = useAuthContext();
  const [newAsset, setNewAsset] = useState<Asset>({});
  const [loading, setLoading] = useState<boolean>(false);

  const model: Field[] = [
    {
      label: 'Legal name',
      key: 'legal_name',
      type: 'string',
      show: true
    },
    {
      label: 'Company website url',
      key: 'company_website',
      type: 'string',
      placeholder: 'https://www.website.com',
      show: true
    },
    {
      label: 'Asset type',
      key: 'type',
      type: 'select',
      show: true,
      items: asset_type
    },
    {
      label: 'Security type',
      key: 'security_type',
      type: 'select',
      show: true,
      items: asset_security_type
    }
  ];

  const createNew = async () => {
    if (!dealId) return;
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('assets')
        .upsert({ id: newAsset?.id, ...newAsset }).select();

      if (data) {
        onCreate(data);
      }

      setNewAsset({
        deal_id: dealId
      });

      if (error) {
        notify(`Sorry, could not create new asset.`, false);
        return;
      }
      notify('Successfully created !', true);
    } catch (error) {
      console.log(error);
      notify(`Sorry, could not create new asset.`, false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setNewAsset({
      deal_id: dealId,
      type: 'startup',
      security_type: 'safe'
    });
  }, [dealId]);

  useEffect(() => {
    if (asset) setNewAsset(asset);
  }, [asset]);

  return (
    <div className="w-full">
      <FormBuilder
        data={newAsset}
        emit={true}
        model={model}
        onSubmit={(v: any) => {
          setNewAsset(v);
        }}
      />
      <div className="mt-6">
        <Button
          loading={loading}
          disabled={loading}
          label={`${asset ? 'Update' : 'Save'}`}
          onClick={createNew}
        />
      </div>
    </div>
  );
}
