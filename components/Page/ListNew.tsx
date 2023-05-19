'use client';
import { useAuthContext } from '@/app/context';
import LoadingPageList from '@/components/Loading/Page';
import Table from '@/components/Table';
import { useSupabase } from '@/lib/supabase-provider';
import { Alert, Dialog, Grid, Slide } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import React, { useEffect, useState } from 'react';
import Button from '../Button';
import FormsNew from '../Forms/New';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function PageList({ data }: { data: any }) {
  const { header, model, table } = data;

  const { supabase } = useSupabase();
  const [initialData, setInitialData] = useState<Array<any>>([]);
  const [search, setSearch] = useState<string | null>(null);
  const [results, setResults] = useState<Array<any>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const { user } = useAuthContext();

  const getOriginalTable = () => {
    const { original } = table;
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
    const { origin, query, query_type, target } = table;
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

      // if (isMigration) {
      //   request = request.eq('is_migration', true);
      // }

      let { data: _data }: any = await request;

      if (_data && _data.length > 0) {
        if (target) {
          setInitialData(_data.map((d: any) => d[target]));
          return;
        }
        setInitialData(_data);
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
        return values.some((value: any) => {
          if (value === null) {
            return false;
          }

          if (typeof value === 'boolean') {
            return false;
          }

          return value?.includes(search ?? '');
        });
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
            table: table.target ? table.target : getOriginalTable()
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
              {header.buttons && header.buttons.new && (
                <Dialog
                  open={openModal}
                  TransitionComponent={Transition}
                  keepMounted
                  aria-describedby="alert-dialog-slide-description"
                >
                  <FormsNew
                    element={table.element}
                    model={model}
                    setOpenModal={setOpenModal}
                    table={table.origin}
                    type={table.type}
                  />
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
                        label="Create new"
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
            {user && user.is_super_admin && (
              <Grid item xs={4} className="mb-4">
                <Alert severity="success">As an admin, you can edit.</Alert>
              </Grid>
            )}
          </Grid>
          <Grid container>
            {!search && initialData && (
              <Table
                data={initialData.sort((a: any, b: any) => {
                  const dateA = new Date(a.created_at);
                  const dateB = new Date(b.created_at);
                  // @ts-ignore
                  return dateB - dateA;
                })}
                headers={table.headers}
                model={model}
                table={getOriginalTable()}
                type={table.type}
              />
            )}
            {search && (
              <Table
                data={results}
                headers={table.headers}
                model={model}
                table={getOriginalTable()}
                type={table.type}
              />
            )}
          </Grid>
        </div>
      )}
    </div>
  );
}
