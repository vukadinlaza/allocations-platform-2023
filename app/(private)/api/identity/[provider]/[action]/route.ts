import { createRouteHandlerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { cookies, headers } from 'next/headers';
import { NextResponse } from 'next/server';
import {
  Configuration,
  CountryCode,
  PlaidApi,
  PlaidEnvironments,
  Products
} from 'plaid';
import {LinkTokenCreateRequest} from "plaid/dist/api";

export const revalidate = 0;

const getPlaidClient = async () => {
  const configuration = new Configuration({
    basePath: process.env.PLAID_BASE_URL ?? PlaidEnvironments.sandbox,
    baseOptions: {
      headers: {
        'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
        'PLAID-SECRET': process.env.PLAID_SECRET
      }
    }
  });
  return new PlaidApi(configuration);
};

export async function GET(
  request: Request,
  {
    params
  }: {
    params: {
      provider: string;
      action: string;
    };
  }
) {
  const provider = params.provider;
  const action = params.action;
  const supabase = createRouteHandlerSupabaseClient<any>({
    headers,
    cookies
  });
  if (provider === 'PLAID') {
    if (action === 'link') {
      const client = await getPlaidClient();
      const clientUser = (await supabase.auth.getSession()).data.session?.user;
      const clientUserId = clientUser?.id;
      const clientUserEmail = clientUser?.email;
      const request: LinkTokenCreateRequest = {
        update: {
          account_selection_enabled: true
        },
        user: {
          // This should correspond to a unique id for the current user.
          client_user_id: (clientUserId as string) ?? 'test',
          email_address: (clientUserEmail as string) ?? 'test@example.com'
        },
        products: ['identity_verification'] as Products[],
        identity_verification: {
          template_id: process.env.PLAID_IDENTITY_TEMPLATE as string
        },
        client_name: 'Allocations Identity',
        language: 'en',
        country_codes: ['US'] as CountryCode[]
      };
      try {
        const createTokenResponse = await client.linkTokenCreate(request);
        return NextResponse.json(createTokenResponse.data);
      } catch (error) {
        console.error(error);
      }
    } else if (action === 'store_identity') {
    }
  }
  return NextResponse.json({ provider, action });
}

export async function POST(
  request: Request,
  {
    params
  }: {
    params: {
      provider: string;
      action: string;
    };
  }
) {
  const provider = params.provider;
  const action = params.action;
  const supabase = createRouteHandlerSupabaseClient<any>({
    headers,
    cookies
  });
  if (provider === 'PLAID') {
    if (action === 'store_identity') {
      const { link_session_id } = await request.json();
      console.log(provider, action, link_session_id);
      const plaidClient = await getPlaidClient();
      const IDVResult = await plaidClient.identityVerificationGet({
        identity_verification_id: link_session_id
      });
      const IDVData = IDVResult.data;
      const clientUser = (await supabase.auth.getSession()).data.session?.user;
      console.dir(IDVData, { colors: true, depth: null });
      console.dir(await supabase.auth.getUser(), { colors: true, depth: null });
      console.log('Verified');
      //ts-ignore
      let existingRecordId = request.nextUrl.searchParams.get('identity_id');
      if(!existingRecordId) {
        // Perform a lookup by Plaid ID
        const existingIdentity = await supabase
          .from('identities')
          .select('*')
          .eq('provider_id', IDVData.id)
          .select();
        if (existingIdentity.data?.length && existingIdentity.data.length > 0) {
          existingRecordId = existingIdentity.data[0].id;
        }
      }
      console.log(existingRecordId);
      const data = await supabase
        .from('identities')
        .upsert({
          id: existingRecordId ? existingRecordId : undefined,
          user_email: clientUser?.email,
          provider: 'PLAID',
          provider_id: IDVData.id,
          kyc_status: IDVData?.kyc_check?.status,
          legal_name: `${IDVData?.user?.name?.given_name} ${IDVData?.user?.name?.family_name}`,
          address_line_1: IDVData?.user?.address?.street,
          address_line_2: IDVData?.user?.address?.street2,
          city: IDVData?.user?.address?.city,
          region: IDVData?.user?.address?.region,
          postal_code: IDVData?.user?.address?.postal_code,
          country: IDVData?.user.address?.country,
          phone_number: IDVData?.user?.phone_number,
          type: 'Individual',
          tax_id: IDVData?.user?.id_number?.value,
          tax_id_type:
            IDVData?.user?.id_number?.type === 'us_ssn' ? 'SSN' : 'TIN'
        })
        .select();
        console.log(data);
      return NextResponse.json({ provider, action });
    }
  }
  return NextResponse.json({ provider, action });
}
