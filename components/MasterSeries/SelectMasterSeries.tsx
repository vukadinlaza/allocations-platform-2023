import Button from '@/components/Button';
import Select from '@/components/Select';
import { useSupabase } from '@/lib/supabase-provider';
import { Deal } from '@/types';
import Card from '@mui/material/Card';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import NewMasterSeries from './New';

export default function SelectMasterSeries({
  deal,
  onChange,
  loading,
  selected
}: {
  deal: Deal;
  loading?: boolean;
  onChange: (ms: any | undefined) => any;
  selected?: string;
}) {
  const [masterSeriesList, setMasterSeriesList] = useState<any[]>([]);
  const [selectedMasterSeries, setSelectedMasterSeries] = useState<
    string | null
  >('');
  const [create, setCreate] = useState<boolean>(false);
  const [loadingMasterSeries, setLoadingMasterSeries] = useState<boolean>(true);

  const { fetchMasterSeries } = useSupabase();

  const getMasterSeries = async () => {
    try {
      setLoadingMasterSeries(true);
      const { data, error } = await fetchMasterSeries();

      if (data) {
        setMasterSeriesList(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingMasterSeries(false);
    }
  };

  useEffect(() => {
    getMasterSeries();
  }, []);

  useEffect(() => {
    if (selected) {
      const found = masterSeriesList?.find((ms) => ms.id === selected);
      setSelectedMasterSeries(found?.name || '');
    }
  }, [selected, masterSeriesList]);

  useEffect(() => {
    const found = masterSeriesList?.find(
      (ms) => ms.name === selectedMasterSeries
    );
    onChange(found);
  }, [selectedMasterSeries]);

  return (
    <div className="w-full">
      <header className="flex flex-col items-start mb-4">
        <h2 className="text-xl">Select an Entity</h2>
        <p>List of available master series</p>
      </header>
      {loadingMasterSeries && <div className="w-full h-12 loading" />}
      {!loadingMasterSeries && (
        <Select
          selected={selectedMasterSeries}
          items={masterSeriesList.map((ms) => ms.name)}
          onChange={(str: string) => setSelectedMasterSeries(str)}
        />
      )}
      {create && (
        <Card variant="outlined" className="items-start my-4 card">
          <NewMasterSeries
            organizationId={deal.organization_id}
            onCreate={() => {
              getMasterSeries();
              setCreate(false);
            }}
          />
        </Card>
      )}
      <div className="flex items-center gap-4 mt-4">
        <Button
          icon={
            <Image
              src={'/plus.svg'}
              alt="plus"
              className="opacity-50"
              width={18}
              height={18}
            />
          }
          color="info"
          loading={loading || loadingMasterSeries}
          label="New master series"
          onClick={() => setCreate(!create)}
        />
      </div>
    </div>
  );
}
