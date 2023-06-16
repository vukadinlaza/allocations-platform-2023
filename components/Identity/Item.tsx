import Checkbox from '@/components/Checkbox';
import DateComponent from '@/components/DateComponent';
import { getFirstLetter } from '@/lib/utils';
import { Identity } from '@/types';
import Avatar from '@mui/material/Avatar';
import { useState } from 'react';
import { z } from 'zod';
import ChipStatus from '../ChipStatus';

export default function IdentityItem({
  identity,
  onChange,
  selectedId,
  details = false
}: {
  identity: any;
  onChange: (identity: any) => void;
  selectedId?: string;
  details?: boolean;
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
      legal_name: z.string().min(1),
      address_line_1: z.string().min(1),
      country: z.string().min(1),
      region: z.string().min(1).nullable(),
      city: z.string().min(1).nullable(),
      type: z.literal('Individual'),
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

  return (
    <>
      {identity && (
        <div
          className="item"
          onClick={() => {
            if (validateIdentity(identity)) {
              onChange(selectedId === identity.id ? null : identity.id);
            }
          }}
        >
          <div className="grid items-center w-full grid-cols-12 gap-2">
            <div className="flex col-span-4 ">
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
            </div>
            {details && (
              <div className="col-span-2">
                <label>{identity.type}</label>
              </div>
            )}
            {details && (
              <div className="col-span-2">
                <label>
                  <DateComponent date={identity.created_at} />
                </label>
              </div>
            )}
            {details && (
              <div className="col-span-2">
                <label>{identity.tax_id}</label>
              </div>
            )}
            {details && (
              <div className="col-span-2">
                <ChipStatus
                  status={
                    identity.kyc_status === 'success'
                      ? identity.kyc_status
                      : 'missing_data'
                  }
                />
              </div>
            )}
            {!details && (
              <div className="flex items-center justify-end col-span-8">
                <Checkbox
                  disabled={!validateIdentity(identity)}
                  selected={selectedId === identity.id}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
