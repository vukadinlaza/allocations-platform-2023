'use client';
// import { getIdentityLinkToken } from '@/lib/plaid';
// import { Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect } from 'react';
import { usePlaidLink } from 'react-plaid-link';

// export function CreateIdentity({ onSuccess }: { onSuccess: () => void }) {
//   const [plaidLinkToken, setPlaidLinkToken] = useState(null);
//   const getPlaidLink = useCallback(async () => {
//     const { link_token } = await getIdentityLinkToken();
//     setPlaidLinkToken(link_token);
//   }, []);
//   useEffect(() => {
//     void getPlaidLink();
//   }, [getPlaidLink]);

//   return (
//     <>
//       <Card>
//         <CardContent sx={{ p: 3 }}>
//           <Typography variant="h5" component="h2">
//             Create New Identity
//           </Typography>
//           <Divider sx={{ my: 2 }} />
//           <Grid container spacing={3}>
//             <Grid item xs={12}>
//               {plaidLinkToken && (
//                 <PlaidIdentityLink
//                   linkToken={plaidLinkToken}
//                   onSuccess={onSuccess}
//                 />
//               )}
//             </Grid>
//           </Grid>
//         </CardContent>
//       </Card>
//     </>
//   );
// }

// @ts-nocheck
export default function PlaidIdentityLink({
  linkToken,
  onSuccess,
  existingIdentityId
}: {
  linkToken: string;
  onSuccess: () => any;
  existingIdentityId?: string;
}) {
  const config = {
    onSuccess: async (public_token: string, metadata: any) => {
      console.log(public_token, metadata);
      await axios.post(`/api/identity/PLAID/store_identity${existingIdentityId ? '?identity_id=' + existingIdentityId : ''}`, {
        link_session_id: metadata.link_session_id
      });
      onSuccess();
    },
    onExit: async (err: any, metadata: any) => {
      await axios.post(`/api/identity/PLAID/store_identity${existingIdentityId ? '?identity_id=' + existingIdentityId : ''}`, {
        link_session_id: metadata.link_session_id
      });
    },
    onEvent: (eventName: any, metadata: any) => {},
    token: linkToken
  };
  const { open, exit, ready } = usePlaidLink(config);
  useEffect(() => {
    open();
  }, [ready]);
  return <></>;
}
