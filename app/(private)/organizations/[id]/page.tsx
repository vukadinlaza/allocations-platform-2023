'use client';
import { useAuthContext } from '@/app/(private)/context';
import EntitiesList from '@/components/Entities/List';
import LoadingDeal from '@/components/Loading/Deal';
import ModalButton from '@/components/Modal/Button';
import Nav from '@/components/Nav';
import None from '@/components/None';
import OrganizationHeader from '@/components/Organizations/Header';
import OrganizationMembersList from '@/components/Organizations/Members/List';
import NewOrganizationMember from '@/components/Organizations/Members/New';
import { useSupabase } from '@/lib/supabase-provider';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function OrganizationID() {
  const { supabase } = useSupabase();
  const { user } = useAuthContext();
  const [organization, setOrganization] = useState<any>(undefined);
  const [active, setActive] = useState<string>('Members');
  const [loading, setLoading] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const params = useParams();

  const items = [{ key: 'Members' }, { key: 'Entities' }];

  const fetchOrganization = async () => {
    if (!params || !params.id) return;

    try {
      setLoading(true);

      const { data: org, error } = await supabase
        .from('organizations')
        .select('*, entities(*), organizations_roles(*, users(*))')
        .eq('id', params.id)
        .single();

      if (error) {
        throw error;
      }

      if (org) {
        setOrganization(org);
      }
    } catch (error) {
      // console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user || !organization) return;
    const { organizations_roles } = organization;
    if (!organizations_roles) return;
    const found = organizations_roles.find(
      (r: any) => r.user_email === user.email
    );
    if (found) setIsAdmin(found.type === 'Admin');
  }, [organization]);

  useEffect(() => {
    fetchOrganization();
  }, []);

  return (
    <div className="container w-full organization">
      {loading && <LoadingDeal />}
      {!loading && !organization && <None text="No organization found." />}
      {!loading && organization && (
        <div>
          <OrganizationHeader
            organization={organization}
            isAdmin={isAdmin}
            button={
              <>
                {isAdmin && (
                  <ModalButton
                    onClose={() => {
                      setShowModal(false);
                    }}
                    icon={
                      <Image
                        src={'/plus.svg'}
                        alt="plus"
                        className="opacity-50 invert"
                        width={18}
                        height={18}
                      />
                    }
                    button={{ label: `Add a member` }}
                    title={`Add a member ${
                      organization.name ? 'to ' + organization.name : ''
                    }`}
                    content={
                      <NewOrganizationMember
                        organizationId={organization.id}
                        onCreate={() => {
                          setShowModal(!showModal);
                          fetchOrganization();
                        }}
                      />
                    }
                  />
                )}
              </>
            }
          />
          <div className="my-8">
            <Nav
              items={items.map((item) => item.key)}
              active={active}
              setActive={setActive}
            />
          </div>
          {active === 'Members' && (
            <OrganizationMembersList
              members={organization.organizations_roles.map((r: any) => ({
                ...r.users,
                role: r.type
              }))}
            />
          )}
          {active === 'Entities' && (
            <EntitiesList entities={organization.entities} />
          )}
        </div>
      )}
    </div>
  );
}
