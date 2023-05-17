'use client';
import { useAuthContext } from '@/app/context';
import LoadingPageList from '@/components/Loading/Page';
import Table from '@/components/Table';
import { useSupabase } from '@/lib/supabase-provider';
import { Alert, Card, Dialog, Grid, Slide } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import React, { useEffect, useState } from 'react';
import FormsNew from '../Forms/New';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type Props = {
  dialog?: any;
  header: any;
  headersTable?: any;
  isMigration?: boolean;
  model?: any;
  query?: string;
  queryType?: string;
  table?: string;
  target?: string;
  type?: string;
};

export default function PageList({
  dialog,
  header,
  headersTable,
  isMigration,
  model,
  query,
  queryType,
  table,
  target,
  type
}: Props) {
  const { supabase } = useSupabase();
  const [initialData, setInitialData] = useState<Array<any>>([]);
  const [search, setSearch] = useState<string | null>(null);
  const [results, setResults] = useState<Array<any>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const { user } = useAuthContext();

  const getOriginalTable = (original: string | undefined) => {
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
    if (!user || !table) return;
    try {
      setLoading(true);

      let request = supabase
        .from(table)
        .select(query ?? `*`, { count: 'exact' })
        .order('created_at', { ascending: false });

      if (queryType) {
        request = request.eq('type', queryType);
      }

      if (isMigration) {
        request = request.eq('is_migration', true);
      }

      let { data: _data }: any = await request;

      if (_data && _data.length > 0) {
        if (target) {
          setInitialData(_data.map((d: any) => d[target]));
          return;
        }
        console.log(_data);
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
    fetchData();
    const organizationsRoles = supabase
      .channel('organizations_roles_subscribers')
      .on(
        // @ts-ignore
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: target ? target : getOriginalTable(table)
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
  }, []);

  return (
    <Card className="card" variant="outlined">
      {loading && <LoadingPageList />}
      {!loading && user && (
        <div className="w-full">
          {dialog && (
            <Dialog
              open={openModal}
              TransitionComponent={Transition}
              keepMounted
              aria-describedby="alert-dialog-slide-description"
            >
              {dialog.type === 'FormsNew' && (
                <FormsNew
                  element={dialog.element}
                  model={model}
                  setOpenModal={setOpenModal}
                  table={dialog.table}
                  type={type}
                />
              )}
            </Dialog>
          )}
          {header && (
            <header>
              <div>
                <h1 className="mb-2">
                  <span className="mr-2">{header.name || 'No title'}</span>
                  <div className="chip chip--small chip--info">
                    {initialData && initialData.length ? initialData.length : 0}
                  </div>
                </h1>
                <p>{header.description || 'No description'}</p>
              </div>
              <div className="flex items-center">
                {header.buttons &&
                  header.buttons.map((button: any) => (
                    <button
                      key={button.title}
                      disabled={button.disabled}
                      className={`btn primary ${
                        !button.action ? 'disabled' : ''
                      }`}
                      onClick={() => {
                        if (!button.action) return;
                        if (button.action === 'modal') {
                          setOpenModal(true);
                        }
                      }}
                    >
                      {button.title}
                    </button>
                  ))}
              </div>
            </header>
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
                headers={headersTable}
                model={model}
                table={getOriginalTable(table)}
                type={type}
              />
            )}
            {search && (
              <Table
                data={results}
                headers={headersTable}
                model={model}
                table={getOriginalTable(table)}
                type={type}
              />
            )}
          </Grid>
        </div>
      )}
    </Card>
  );
}
