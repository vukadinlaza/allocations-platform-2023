import Button from '@/components/Button';
import InvestmentsDocumentsList from '@/components/Investments/Documents/List';
import LoadingList from '@/components/Loading/List';
import ModalBox from '@/components/Modal';
import None from '@/components/None';
import Price from '@/components/Price';
import UserItem from '@/components/UserItem';
import { useSupabase } from '@/lib/supabase-provider';
import { getFullName } from '@/lib/utils';
import { Deal } from '@/types';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { uniqBy } from 'lodash';
import React, { useEffect, useState } from 'react';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DealAdminInvestors({ deal }: { deal?: Deal }) {
  const { supabase } = useSupabase();
  const [loading, setLoading] = useState<boolean>(true);
  const [openModal, setOpenModal] = useState<any>(undefined);
  const [modalData, setModalData] = useState<any>(undefined);
  const [kanban, setKanban] = useState<any>({
    invited: [],
    signed: [],
    completed: []
  });

  const fetchInvestors = async () => {
    if (!deal) return;
    try {
      setLoading(true);
      let { data: investments, error } = await supabase
        .from('investments')
        .select('*, users(*)')
        .eq('deal_id', deal.id)
        .neq('status', 'archived');

      if (investments) {
        let data: any = {
          signed: [],
          completed: []
        };
        investments.forEach((investment) => {
          const { status } = investment;
          if (data[status]) data[status].push(investment);
        });
        setKanban((prev: any) => ({
          ...prev,
          ...data
        }));
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchInvitations = async () => {
    if (!deal) return;
    try {
      setLoading(true);
      let { data: invitations, error } = await supabase
        .from('invitations')
        .select('*')
        .eq('deal_id', deal.id);

      if (invitations) {
        setKanban((prev: any) => ({
          ...prev,
          invited: uniqBy(
            invitations?.map((invitation) => ({
              ...invitation,
              users: { email: invitation.recipient_email }
            })),
            'recipient_email'
          )
        }));
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchKanban = async () => {
    const promises = [fetchInvitations(), fetchInvestors()];
    await Promise.all(promises);
  };

  useEffect(() => {
    fetchKanban();
  }, []);

  return (
    <div>
      {loading && <LoadingList />}
      {!loading && (
        <div className="grid gap-4 md:grid-cols-3">
          {Object.entries(kanban).map(([category, items]: any) => (
            <div className="bg-white border rounded card--popup" key={category}>
              <header className="flex justify-between">
                <h2 className="mb-0 capitalize">
                  <span className="mr-2">
                    {category === 'completed' ? 'Completed / Wired' : category}
                  </span>
                  <span className="chip chip--small chip--info">
                    {items.length}
                  </span>
                </h2>
                <div>
                  {category === 'completed' && (
                    <label>
                      <Price
                        price={
                          items?.reduce(
                            (sum: number, item: any) =>
                              sum + item.subscription_amount,
                            0
                          ) || 0
                        }
                      />
                    </label>
                  )}
                </div>
              </header>
              <div className="w-full px-4 py-6">
                {items.length === 0 && <None text={`No ${category} yet.`} />}
                {items.length > 0 && (
                  <div className="grid gap-2">
                    {items.map((item: any, index: number) => (
                      <div
                        key={index}
                        className="transition cursor-pointer hover:bg-gray-50"
                        onClick={() => {
                          setModalData(item);
                          setOpenModal(!openModal);
                        }}
                      >
                        <UserItem
                          user={item.users}
                          content={
                            category === 'signed' ||
                            category === 'completed' ? (
                              <label>
                                {<Price price={item.subscription_amount} />}
                              </label>
                            ) : null
                          }
                        />
                      </div>
                    ))}
                    <Dialog
                      open={openModal}
                      TransitionComponent={Transition}
                      keepMounted
                      aria-describedby="alert-dialog-slide-description"
                    >
                      <ModalBox
                        title={`${getFullName(modalData?.users) || ''}`}
                        onClose={() => setOpenModal(false)}
                        content={
                          <div>
                            <InvestmentsDocumentsList
                              deal={deal}
                              investment={modalData}
                            />
                            <Button
                              color="info"
                              label={'Cancel'}
                              onClick={() => setOpenModal(false)}
                            />
                          </div>
                        }
                      />
                    </Dialog>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
