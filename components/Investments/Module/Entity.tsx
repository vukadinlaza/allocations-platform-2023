import Checkbox from '@/components/Checkbox';
import {getFirstLetter} from '@/lib/utils';
import {Identity} from '@/types';
import Avatar from '@mui/material/Avatar';
import Image from 'next/image';
import {useEffect, useState} from 'react';
import NewUserInvestmentsEntity from './Entity/New';
import {z} from "zod";
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import {getIdentityLinkToken} from "@/lib/plaid";
import PlaidIdentityLink from "@/components/Plaid/IdentityLink";
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';


export default function InvestmentEntity(
  {
    identities = [],
    onChange,
    selected,
    onUpdate,
    validate = true
  }: {
    identities: Identity[];
    onChange: (v: any) => any;
    onUpdate: () => any;
    selected: any;
    validate?: boolean;
  }) {
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    if (show === true) {
      onChange(null);
    }
  }, [show]);
  const [loading, setLoading] = useState<string|null>(null);
  const [token, setToken] = useState<string|null>(null);
  const [selectedId, setSelectedId] = useState<string|undefined>(undefined);

  const openPlaidIdentity = async (identityId: string) => {
    try {
      setLoading(identityId);
      setSelectedId(identityId);
      const response = await getIdentityLinkToken();

      if (response && response.link_token) {
        setToken(response.link_token);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(null);
    }
  };

  const identityValidation = z.discriminatedUnion("type", [
    z.object({
      type: z.literal("Individual"),
      legal_name: z.string().min(1),
      address_line_1: z.string().min(1),
      country: z.string().min(1),
      region: z.string().min(1),
      user_email: z.string().email(),
      title: z.string().optional().nullable()
    }),
    z.object({
      type: z.literal("Entity"),
      legal_name: z.string().min(1),
      country: z.string().min(1),
      region: z.string().min(1),
      user_email: z.string().email(),
      identities: z.array(z.object({
        legal_name: z.string().min(1)
      })).min(1)
    })
  ]);
  const validateIdentity = (identity: Identity, returnErrors: boolean = false) => {
    const result = identityValidation.safeParse(identity);
    console.log(result, identity);
    if (!returnErrors)
      return result.success;
    if (!result.success)
      return result.error.format();
  }

  return (
    <div>
      <header className="mb-6">
        <h2 className="text-lg font-bold">Select an identity to invest as</h2>
      </header>
      <main>
        <div>
          {identities && (
            <Box sx={{maxHeight: '80vh', overflowY:'scroll'}}>
              {identities.map((identity: Identity, index: number) => (
                <div
                  key={'identity-' + identity.id}
                  className="flex items-center justify-between p-2 mb-4 border rounded cursor-pointer hover:bg-gray-50"
                  onClick={() => {
                    if (validateIdentity(identity)) {
                      onChange(identity)
                    }
                  }}
                >
                  <Avatar
                    className="mr-2 cursor-pointer"
                    sx={{
                      width: 32,
                      height: 32,
                      backgroundColor: '#3db278',
                      textTransform: 'capitalize'
                    }}
                  >
                    {getFirstLetter(identity.legal_name)}
                  </Avatar>
                  <div className="flex flex-col grow">
                    {identity.legal_name && (
                      <span className="mb-0">{identity.legal_name}</span>
                    )}
                    {identity.type === 'Individual' && (
                      <span className="text-xs text-gray-600">
                        A {identity.country} {identity.type}
                      </span>
                    )}
                    {identity.entity_type && (
                      <span className="text-xs text-gray-600">
                        A {identity.country} {identity.entity_type} Entity
                      </span>
                    )}
                  </div>
                  <Box className={'flex flex-col'}>
                    {!validateIdentity(identity) &&
                        <Box className={'flex flex-row justify-center items-center mr-2'}>
                          {identity.type === 'Individual' && (<LoadingButton
                            loading={loading == identity.id}
                            onClick={()=>openPlaidIdentity(identity.id)}
                          >Fix Now</LoadingButton>)}
                            <Tooltip title="Missing required information" arrow>
                                <ReportProblemIcon sx={{
                                  color: 'gray'
                                }}/>
                            </Tooltip>
                        </Box>
                    }
                  </Box>
                  <Checkbox disabled={!validateIdentity(identity)} selected={selected === identity.id}/>
                </div>
              ))}
            </Box>
          )}
        </div>
        {show && (
          <NewUserInvestmentsEntity
            identities={identities}
            onUpdate={onUpdate}
          />
        )}
        {token && (
          <PlaidIdentityLink existingIdentityId={selectedId} linkToken={token} onSuccess={() => onUpdate()} />
        )}
        <button className="text info" onClick={() => setShow(true)}>
          <Image
            src={'/plus.svg'}
            alt="plus"
            className="mr-2 text-primary-500"
            width={18}
            height={18}
          />
          <span>New investment entity</span>
        </button>
      </main>
    </div>
  );
}
