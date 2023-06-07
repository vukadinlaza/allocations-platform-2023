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
  deal
}: {
  loading: boolean;
  onChange: (v: any) => void;
  deal?: any;
}) {
  const [create, setCreate] = useState<boolean>(false);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [selectedManager, setSelectedManager] = useState<any>(undefined);
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
      if (selectedOrganization) {
        console.log(selectedOrganization);
      }
    }
  }, [deal, organizations]);

  useEffect(() => {
    if (selectedOrganization) {
      onChange({
        organization_id: selectedOrganization.id
      });
    }
  }, [selectedOrganization]);

  useEffect(() => {
    // if (selectedOrganization && selectedManager) {
    //   const members = selectedOrganization.organizations_roles.map(
    //     (o: any) => o.users
    //   );
    //   const found = members?.find((m: any) => {
    //     return m.email === selectedManager;
    //   });
    //   console.log(found.id);
    //   onChange({
    //     fund_manager_email: found.id
    //   });
    // }
  }, [selectedManager]);

  return (
    <div className="w-full">
      <header className="flex flex-col items-start mb-4">
        <h2 className="text-xl">Select an organization</h2>
        <p>List of your current organizations</p>
      </header>
      {_loading && <div className="w-full h-12 loading" />}
      {!_loading && (
        <div className="w-full grid-cols-12 gap-4 my-4 md:grid">
          <div className="col-span-12 mb-4 md:col-span-10 md:mb-0">
            <Select
              selected={selectedOrganization?.name}
              items={organizations.map((o) => o.name)}
              onChange={(str: string) => {
                setSelectedOrganization(
                  organizations.find((o) => o.name === str)
                );
              }}
            />
          </div>
          <div className="col-span-12 md:col-span-2">
            <Button
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
      {/* {selectedOrganization && (
        <div>
          <p className="mb-4">Select a manager:</p>
          <Select
            selected={selectedManager}
            items={selectedOrganization.organizations_roles?.map((o: any) => ({
              ...o.users
            }))}
            displayLabel={(m: any) => (
              <span className="lowercase">{m.email}</span>
            )}
            onChange={(manager_email: any) => {
              setSelectedManager(manager_email);
            }}
          />
        </div>
      )} */}
    </div>
  );
}
