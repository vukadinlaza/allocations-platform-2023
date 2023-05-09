'use client';
import { useAuthContext } from '@/app/context';
import List from '@/components/List';
import LoadingPageList from '@/components/Loading/PageList';
import supabase from '@/lib/supabase';
import { Alert, Card, Dialog, Grid, Slide } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import React, { useEffect, useState } from 'react';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function PageList({
  dialog,
  header,
  headersTable,
  type,
  query,
  table,
  queryType,
  target
}: {
  dialog: any;
  header: any;
  headersTable?: any;
  data?: any;
  type?: string;
  table?: string;
  query?: string;
  queryType?: string;
  target?: string;
}) {
  const [initialData, setInitialData] = useState<Array<any>>([]);
  const [search, setSearch] = useState<string | null>(null);
  const [results, setResults] = useState<Array<any>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const { user } = useAuthContext();

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

      let { data: _data, count }: any = await request;

      console.log(_data);

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
    fetchData();
    const organizationsRoles = supabase
      .channel('organizations_roles_subscribers')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: target ? target : table },
        (payload) => {
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
              {dialog.component && (
                <dialog.component
                  setOpenModal={setOpenModal}
                  open={openModal}
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
              <div>
                {header.buttons &&
                  header.buttons.map((button: any) => (
                    <button
                      key={button.title}
                      disabled={button.disabled}
                      className="btn primary"
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
                <Alert severity="success">
                  As an admin, you can look & edit.
                </Alert>
              </Grid>
            )}
          </Grid>
          <Grid container>
            {!search && initialData && (
              <List
                type={type}
                headers={headersTable}
                data={initialData.sort((a: any, b: any) => {
                  const dateA = new Date(a.created_at);
                  const dateB = new Date(b.created_at);
                  // @ts-ignore
                  return dateB - dateA;
                })}
              />
            )}
            {search && (
              <List type={type} headers={headersTable} data={results} />
            )}
          </Grid>
        </div>
      )}
    </Card>
  );
}
