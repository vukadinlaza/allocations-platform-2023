'use client';
// libs
import { useAuthContext } from '@/app/context';
import { useSupabase } from '@/lib/supabase-provider';
import CloseIcon from '@mui/icons-material/Close';
import { Card, Dialog, Grid, Slide } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import React, { useEffect, useState } from 'react';

// components
import Button from '@/components/Button';
import NewDeal from '@/components/Deals/New';
import KYC from '@/components/Identity/KYC';
import NewUserInvestmentEntity from '@/components/Investments/Module/Entity/New';
import LoadingPageList from '@/components/Loading/Page';
import NewOrganization from '@/components/Organizations/New';
import Table from '@/components/Table';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function PageList({ data }: { data: any }) {
  const { header, table } = data;
  const { supabase } = useSupabase();
  const [initialData, setInitialData] = useState<Array<any>>([]);
  const [search, setSearch] = useState<string | null>(null);
  const [results, setResults] = useState<Array<any>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const { user } = useAuthContext();

  const getTable = () => {
    const { original, target } = table;
    if (target) return target;
    if (!original) return;
    if (original.includes('hydrated_')) {
      return original.replace('hydrated_', '').trim();
    }
    if (original.includes('limited_')) {
      return original.replace('limited_', '').trim();
    }
    return original;
  };

  const fetchData = async () => {
    if (!table) return;
    const { origin, query, query_type, is_migration } = table;
    if (!user || !origin) return;
    try {
      setLoading(true);

      let request = supabase
        .from(origin)
        .select(query ?? `*`, { count: 'exact' })
        .order('created_at', { ascending: false });

      if (query_type) {
        request = request.eq('type', query_type);
      }

      if (is_migration) {
        request = request.eq('is_migration', true);
      }

      // if (isMigration) {
      //   request = request.eq('is_migration', true);
      // }

      let { data: _data }: any = await request;

      if (_data && _data.length > 0) {
        const sorted = _data.sort((a: any, b: any) => {
          const dateA = new Date(a.created_at);
          const dateB = new Date(b.created_at);
          // @ts-ignore
          return dateB - dateA;
        });
        setInitialData(
          table.to_display
            ? sorted.map((d: any) => d[table.to_display])
            : sorted
        );
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (search && initialData) {
      const filteredResults = initialData.filter((x) => {
        const values = Object.values(x);
        const filteredValues = values.filter((v) => v !== null);
        if (filteredValues.length > 0) {
          return filteredValues.some((value: any) => {
            if (typeof value === 'boolean') {
              return false;
            }
            return value.includes(search ?? '')
              ? value.includes(search ?? '')
              : false;
          });
        }
      });
      setResults(filteredResults);
      return;
    }
    setResults([]);
  }, [search]);

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
            console.log(newElement);
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
              {header.buttons && (
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
                      {table && <h2>Create a new {table.element}</h2>}
                      <CloseIcon
                        fontSize="inherit"
                        className="text-2xl cursor-pointer text-gray"
                        onClick={() => setOpenModal(false)}
                      />
                    </header>
                    <div className="p-6">
                      {header.buttons &&
                        header.buttons.map((button: any, index: any) => {
                          if (button.type === 'deal') {
                            return (
                              <NewDeal
                                key={index}
                                type={table.type}
                                onCreate={() => setOpenModal(false)}
                              />
                            );
                          }
                          if (button.type === 'organization') {
                            return (
                              <NewOrganization
                                key={index}
                                onCreate={() => setOpenModal(false)}
                              />
                            );
                          }
                          if (button.type === 'users_entity') {
                            return (
                              <NewUserInvestmentEntity
                                hideHeader={true}
                                key={index}
                                onUpdate={() => setOpenModal(false)}
                              />
                            );
                          }
                          if (button.type === 'verify') {
                            return (
                              <KYC
                                key={index}
                                onUpdate={() => setOpenModal(false)}
                              />
                            );
                          }
                        })}
                    </div>
                  </Card>
                </Dialog>
              )}
              <header>
                <div>
                  <h1 className="mb-2">
                    <span className="mr-2">{header.name || 'No title'}</span>
                    <div className="chip chip--small chip--info">
                      {initialData && initialData.length
                        ? initialData.length
                        : 0}
                    </div>
                  </h1>
                  <p>{header.description || 'No description'}</p>
                </div>
                <div className="flex items-center">
                  {header.buttons &&
                    Object.values(header.buttons).map((button: any) => (
                      <Button
                        label={button.label || 'Create new'}
                        onClick={() => {
                          setOpenModal(true);
                        }}
                        key={button.title}
                      />
                    ))}
                </div>
              </header>
            </div>
          )}
          <Grid container xs={12} className="mb-6">
            <Grid item xs={8}>
              <input
                style={{ maxWidth: '400px' }}
                type="text"
                id="outlined-start-adornment"
                placeholder={'Search...'}
                onInput={(e: any) => setSearch(e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid container>
            {!search && initialData && (
              <Table
                data={initialData}
                headers={table.headers}
                table={getTable()}
              />
            )}
            {search && (
              <Table
                data={results}
                headers={table.headers}
                table={getTable()}
              />
            )}
          </Grid>
        </div>
      )}
    </div>
  );
}
