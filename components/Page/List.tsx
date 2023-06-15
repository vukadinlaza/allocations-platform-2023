'use client';
// libs
import { useSupabase } from '@/lib/supabase-provider';
import CloseIcon from '@mui/icons-material/Close';
import Card from '@mui/material/Card';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { useAuthContext } from 'app/(private)/context';
import { orderBy } from 'lodash';
import React, { useEffect, useState } from 'react';

// components
import Button from '@/components/Button';
import NewDeal from '@/components/Deals/New';
import KYC from '@/components/Identity/KYC';
import NewUserInvestmentEntityIdentity from '@/components/Investments/Module/Entity/New';
import LoadingPageList from '@/components/Loading/Page';
import NewOrganization from '@/components/Organizations/New';
import Table, { SortConfig } from '@/components/Table';
import TableResponsive from '@/components/Table/Responsive';
import PageHeader from './Header';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function PageList({ data }: { data: any }) {
  const { header, table, filters } = data;
  const { supabase } = useSupabase();

  const [initialData, setInitialData] = useState<Array<any>>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [sortedBy, setSortedBy] = useState<any>({
    key: table.orderBy || 'created_at',
    order: 'desc'
  });

  const { user } = useAuthContext();

  const getTable = () => {
    const { original, target } = table;
    if (target) return target;
    if (!original) return;
    return original;
  };

  const fetchData = async () => {
    if (!table) return;
    const { origin, query, queryType, is_migration, orderBy } = table;
    if (!user || !origin) return;
    try {
      setLoading(true);

      console.log(orderBy);

      let request = supabase
        .from(origin)
        .select(query ?? `*`, { count: 'exact' })
        .order(orderBy || 'created_at', { ascending: false });

      if (queryType) {
        request = request.eq('type', queryType);
      }

      if (is_migration) {
        request = request.eq('is_migration', true);
      }

      let { data: _data }: any = await request;

      if (_data && _data.length > 0) {
        const sorted = _data.sort((a: any, b: any) => {
          const dateA = new Date(a.created_at);
          const dateB = new Date(b.created_at);
          // @ts-ignore
          return dateB - dateA;
        });

        const dataToSet = table.to_display
          ? sorted.map((d: any) => d[table.to_display])
          : sorted;
        // TODO temporary archived
        setInitialData(dataToSet.filter((x: any) => x.status !== 'archived'));
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const sorted = orderBy(initialData, sortedBy.key, [sortedBy.order]);
    setInitialData(sorted);
  }, [sortedBy]);

  useEffect(() => {
    setInitialData([]);
    if (table) {
      fetchData();
      const organizationsRoles = supabase
        .channel('organizations_roles_subscribers')
        .on(
          // @ts-ignore
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: getTable()
          },
          (payload: any) => {
            const { eventType } = payload;
            const newElement: any = payload.new;
            if (eventType === 'INSERT') {
              setInitialData((prevData: any) => [...prevData, newElement]);
            }
            if (eventType === 'DELETE') {
              setInitialData((prevData: any) => {
                const filteredData = prevData.filter(
                  (x: any) => x.id !== newElement.id
                );
                return filteredData;
              });
            }
            if (eventType === 'UPDATE') {
              setInitialData((prevData: any) => {
                const updatedData = prevData.map((x: any) => {
                  if (x.id === newElement.id) {
                    return Object.assign({}, x, newElement);
                  } else {
                    return x;
                  }
                });
                return updatedData;
              });
            }
          }
        )
        .subscribe();
    }
  }, [table]);

  return (
    <div className="w-full">
      {loading && <LoadingPageList />}
      {!loading && user && (
        <div className="w-full">
          {header && table && (
            <div>
              <PageHeader
                header={{ ...header, length: initialData.length || 0 }}
                content={
                  <div className="flex items-center">
                    {header.buttons &&
                      Object.values(header.buttons).map(
                        (button: any, index: number) => (
                          <div key={index}>
                            <Dialog
                              open={openModal}
                              TransitionComponent={Transition}
                              keepMounted
                              aria-describedby="alert-dialog-slide-description"
                            >
                              <Card
                                className="mb-0 overflow-auto card--popup"
                                variant="outlined"
                              >
                                <header className="sticky">
                                  {table && (
                                    <h2>Create a new {table.element}</h2>
                                  )}
                                  <CloseIcon
                                    fontSize="inherit"
                                    className="text-4xl cursor-pointer text-gray"
                                    onClick={() => setOpenModal(false)}
                                  />
                                </header>
                                <div className="p-6">
                                  {header.buttons &&
                                    header.buttons.map(
                                      (button: any, index: any) => {
                                        if (button.type === 'deal') {
                                          return (
                                            <NewDeal
                                              key={index}
                                              type={table.type}
                                              onCreate={() =>
                                                setOpenModal(false)
                                              }
                                            />
                                          );
                                        }
                                        if (button.type === 'organization') {
                                          return (
                                            <NewOrganization
                                              key={index}
                                              onCreate={() =>
                                                setOpenModal(false)
                                              }
                                            />
                                          );
                                        }
                                        if (button.type === 'users_entity') {
                                          return (
                                            <NewUserInvestmentEntityIdentity
                                              hideHeader={true}
                                              key={index}
                                              onUpdate={() =>
                                                setOpenModal(false)
                                              }
                                            />
                                          );
                                        }
                                        if (button.type === 'verify') {
                                          return (
                                            <KYC
                                              key={index}
                                              onUpdate={() =>
                                                setOpenModal(false)
                                              }
                                            />
                                          );
                                        }
                                      }
                                    )}
                                </div>
                              </Card>
                            </Dialog>
                            <Button
                              label={button.label || 'Create new'}
                              onClick={() => {
                                setOpenModal(true);
                              }}
                              key={button.label}
                            />
                          </div>
                        )
                      )}
                  </div>
                }
              />
            </div>
          )}
          <div className="hidden md:flex">
            <Table
              handleSort={(obj: SortConfig) => {
                setSortedBy(obj);
              }}
              sortedBy={sortedBy}
              data={initialData}
              headers={table.headers}
              table={getTable()}
            />
          </div>
          <div className="flex md:hidden">
            <TableResponsive
              data={initialData}
              headers={table.headers}
              table={getTable()}
            />
          </div>
        </div>
      )}
    </div>
  );
}
