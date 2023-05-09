import axios from 'axios';

export const getIdentityLinkToken = async ()=>{
  const {data: linkToken} = await axios.get('/api/identity/PLAID/link');
  return linkToken;
}
