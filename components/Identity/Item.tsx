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
      type: z.literal('Individual'),
      tax_id: z.string().min(1),
      tax_id_type: z.string().min(1),
      address_line_1: z.string().min(1),
      city: z.string().min(1).nullable(),
      region: z.string().min(1).nullable(),
      country: z.string().min(1),
      postal_code: z.string().min(1),
      us_domestic: z.string().min(1).nullable(), // us domestic nullable
      legal_name: z.string().min(1),
      country_of_citizenship: z.string().optional().nullable()
    }),
    z.object({
      type: z.literal('Entity'),
      entity_type: z.string().min(1),
      date_of_entity_formation: z.string().min(1),
      tax_id: z.string().min(1),
      tax_id_type: z.string().min(1),
      address_line_1: z.string().min(1),
      city: z.string().min(1).nullable(),
      region: z.string().min(1).nullable(),
      country: z.string().min(1),
      postal_code: z.string().min(1),
      us_domestic: z.string().min(1).nullable(), // us domestic nullable
      legal_name: z.string().min(1),
      country_of_citizenship: z.string().optional().nullable()
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
            <div className="flex items-center col-span-4">
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
                    !validateIdentity(identity)
                      ? 'missing_data'
                      : identity.kyc_status || 'success'
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
