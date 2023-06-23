import Button from '@/components/Button';
import Select from '@/components/Select';
import { useSupabase } from '@/lib/supabase-provider';
import { Organization } from '@/types';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import NewOrganization from './New';

export default function SelectOrganization({
  onChange,
  loading,
  disabled,
  header = true,
  deal
}: {
  loading: boolean;
  disabled?: boolean;
  header?: boolean;
  onChange: (v: any) => void;
  deal?: any;
}) {
  const [create, setCreate] = useState<boolean>(false);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [selectedOrganization, setSelectedOrganization] =
    useState<any>(undefined);
  const [_loading, setLoading] = useState<boolean>(true);

  const { fetchOrganizations } = useSupabase();

  const getOrganizations = async () => {
    try {
      setLoading(true);
      let { data, error } = await fetchOrganizations();

      if (data) {
        setOrganizations(data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const findManager = (uuid: string) => {
    if (!uuid && !selectedOrganization) return;
    const members = selectedOrganization.organizations_roles.map(
      (o: any) => o.users
    );
    return members.find((m: any) => m.id === uuid);
  };

  useEffect(() => {
    getOrganizations();
  }, []);

  useEffect(() => {
    if (deal) {
      const organizationFound = organizations?.find(
        (o) => o.id === deal.organization_id
      );
      setSelectedOrganization(organizationFound);
    }
  }, [deal, organizations]);

  useEffect(() => {
    if (selectedOrganization) {
      onChange({
        organization_id: selectedOrganization.id
      });
    }
  }, [selectedOrganization]);

  return (
    <div className="w-full SelectOrganization">
      {header && (
        <header className="flex flex-col mb-4 items-left">
          <h2 className="text-xl">Select an organization</h2>
          <label>List of your current organizations</label>
        </header>
      )}
      {_loading && <div className="w-full h-12 loading" />}
      {!_loading && (
        <div className="flex w-full gap-4 md:grid">
          <div className="w-full mb-4 md:mb-0">
            <Select
              placeholder="Select an organization"
              disabled={disabled}
              selected={selectedOrganization?.name}
              items={organizations.map((o) => o.name).sort()}
              onChange={(str: string) => {
                setSelectedOrganization(
                  organizations.find((o) => o.name === str)
                );
              }}
            />
          </div>
          <div>
            <Button
              disabled={disabled}
              icon={
                <Image
                  src={'/plus.svg'}
                  alt="plus"
                  className="opacity-50 w-18 h-18"
                  width={18}
                  height={18}
                />
              }
              color="info whitespace-nowrap"
              loading={loading || _loading}
              label="New organization"
              onClick={() => setCreate(!create)}
            />
          </div>
        </div>
      )}
      {create && (
        <NewOrganization
          onClose={() => setCreate(false)}
          onCreate={() => {
            getOrganizations();
            setCreate(false);
          }}
        />
      )}
    </div>
  );
}
