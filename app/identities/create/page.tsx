'use client';
import { Button, Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import { PlaidLinkOptions, usePlaidLink } from 'react-plaid-link';
import { FC, useCallback, useEffect, useState } from 'react';
import { getIdentityLinkToken } from '@/lib/plaid';
import axios from 'axios';

const CreateIdentity = () => {
  const [plaidLinkToken, setPlaidLinkToken] = useState(null);
  const getPlaidLink = useCallback(async ()=>{
    const {link_token} = await getIdentityLinkToken();
    setPlaidLinkToken(link_token);
  }, []);
  useEffect(() => {
    void getPlaidLink();
  }, [getPlaidLink]);

  return (<>
    <Card>
      <CardContent sx={{ p: 3 }}>
        <Typography variant='h5' component='h2'>
          Create New Identity
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Grid container spacing={3}>
          <Grid item xs={12}>
            Test
            { plaidLinkToken && <PlaidIdentityLink linkToken={plaidLinkToken} /> }
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  </>);
}

const PlaidIdentityLink: FC<{linkToken: string}> = ({linkToken})=>{
  const config: PlaidLinkOptions = {
    onSuccess: async (public_token, metadata) => {
      console.log(public_token, metadata);
      await axios.post('/api/identity/PLAID/store_identity', {
        link_session_id: metadata.link_session_id
      });
    },
    onExit: async (err, metadata) => {
      await axios.post('/api/identity/PLAID/store_identity', {
        link_session_id: metadata.link_session_id
      });
    },
    onEvent: (eventName, metadata) => {
    },
    token: linkToken
  };
  const { open, exit, ready } = usePlaidLink(config);
  return (
    <>
      <Button onClick={()=>open()}>Start</Button>
    </>
  );
}

export default CreateIdentity;
