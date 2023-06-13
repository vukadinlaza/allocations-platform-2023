import Checkbox from '@/components/Checkbox';
import { getIdentityLinkToken } from '@/lib/plaid';
import { getFirstLetter } from '@/lib/utils';
import { Identity } from '@/types';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import { useState } from 'react';
import { z } from 'zod';

export default function IdentityItem({
  identity,
  onChange,
  setToken,
  selectedId
}: {
  identity: any;
  onChange: (identity: any) => void;
  setToken?: (token: any) => void;
  selectedId?: string;
}) {
  const [loading, setLoading] = useState<boolean>(false);

  const validateIdentity = (
    identity: Identity,
    returnErrors: boolean = false
  ) => {
    const result = identityValidation.safeParse(identity);
    if (!returnErrors) return result.success;
    if (!result.success) {
      return result.error.format();
    }
  };

  const identityValidation = z.discriminatedUnion('type', [
    z.object({
      type: z.literal('Individual'),
      legal_name: z.string().min(1),
      address_line_1: z.string().min(1),
      country: z.string().min(1),
      region: z.string().min(1).nullable(),
      user_email: z.string().email(),
      title: z.string().optional().nullable()
    }),
    z.object({
      type: z.literal('Entity'),
      legal_name: z.string().min(1),
      country: z.string().min(1),
      region: z.string().min(1).nullable(),
      user_email: z.string().email(),
      identities: z
        .array(
          z.object({
            legal_name: z.string().min(1)
          })
        )
        .min(1)
    })
  ]);

  const openPlaidIdentity = async (identityId: string) => {
    try {
      setLoading(true);
      onChange(identity.id);
      const response = await getIdentityLinkToken();

      if (response && response.link_token && setToken) {
        setToken(response.link_token);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {identity && (
        <div
          className="flex items-center justify-between px-3 py-1 mb-4 border rounded-lg cursor-pointer hover:bg-gray-50"
          onClick={() => {
            if (validateIdentity(identity)) {
              onChange(selectedId === identity.id ? null : identity.id);
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
              <span className="mb-0 text-sm">
                {identity.legal_name || 'No name provided'}
              </span>
            )}
            {identity.type === 'Individual' && (
              <span className="text-xs text-gray-600">
                A {identity.country} {identity.type}
              </span>
            )}
            {identity.type !== 'Individual' && (
              <span className="text-xs text-gray-600">
                A {identity.country} {identity.entity_type} Entity
              </span>
            )}
          </div>
          <Box className={'flex flex-col'}>
            {!validateIdentity(identity) && (
              <Box className={'flex flex-row justify-center items-center mr-2'}>
                {identity.type === 'Individual' && (
                  <LoadingButton
                    loading={loading}
                    onClick={() => openPlaidIdentity(identity.id)}
                  >
                    Fix Now
                  </LoadingButton>
                )}
                <Tooltip title="Missing required information" arrow>
                  <ReportProblemIcon
                    sx={{
                      color: 'gray'
                    }}
                  />
                </Tooltip>
              </Box>
            )}
          </Box>
          <Checkbox
            disabled={!validateIdentity(identity)}
            selected={selectedId === identity.id}
          />
        </div>
      )}
    </>
  );
}
