import Checkbox from '@/components/Checkbox';
import DateComponent from '@/components/DateComponent';
import EditIdentity from '@/components/Identity/Edit';
import { getFirstLetter } from '@/lib/utils';
import { Identity } from '@/types';
import Avatar from '@mui/material/Avatar';
import { useState } from 'react';
import { z } from 'zod';
import ChipStatus from '../ChipStatus';
import ModalButton from '../Modal/Button';

export const identityValidation = z.discriminatedUnion('type', [
  z.object({
    tax_id: z.string().min(1),
    tax_id_type: z.string().min(1),
    address_line_1: z.string().min(1),
    city: z.string().min(1),
    region: z.string().min(1).nullable(),
    country: z.string().min(1),
    postal_code: z.string().min(1),
    legal_name: z.string().min(1),
    country_of_citizenship: z.string().optional().nullable(),
    date_of_entity_formation: z.string().min(1),
    type: z.literal('Individual')
  }),
  z.object({
    entity_type: z.string().min(1),
    date_of_entity_formation: z.string().min(1),
    tax_id: z.string().min(1),
    tax_id_type: z.string().min(1),
    address_line_1: z.string().min(1),
    city: z.string().min(1).nullable(),
    region: z.string().min(1).nullable(),
    country: z.string().min(1),
    postal_code: z.string().min(1),
    legal_name: z.string().min(1),
    country_of_citizenship: z.string().optional().nullable(),
    type: z.literal('Entity')
  })
]);

export const validateIdentity = (
  identity: Identity,
  returnErrors: boolean = false
) => {
  const result = identityValidation.safeParse(identity);
  if (!returnErrors) return result.success;
  if (!result.success) {
    return result.error.format();
  }
};

export default function IdentityItem({
  identity,
  onChange,
  selectedId,
  details = false,
  editable
}: {
  identity: any;
  onChange: (identity: any) => void;
  selectedId?: string;
  details?: boolean;
  editable?: boolean;
}) {
  const [modalOpen, setModalOpen] = useState(false);

  const checkStatus = (identity: any) => {
    const { kyc_status } = identity;
    if (kyc_status === 'error') return 'failed';
    if (!validateIdentity(identity)) return 'missing_data';
    return kyc_status;
  };

  return (
    <>
      {identity && (
        <div
          className="item"
          onClick={() => {
            if (editable && !modalOpen && identity.kyc_status !== 'success')
              setModalOpen(true);
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
                <span className="text-xs text-gray-600">
                  {identity.type} — {identity.country}
                </span>
              </div>
            </div>
            {details && (
              <div className="col-span-2">
                <label>{identity.entity_type}</label>
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
              <div className="flex items-center justify-between col-span-2">
                <ChipStatus status={checkStatus(identity)} />
                {editable && identity.kyc_status !== 'success' && (
                  <ModalButton
                    isOpen={modalOpen}
                    onChange={setModalOpen}
                    title="Edit your identity"
                    content={
                      modalOpen && (
                        <EditIdentity
                          identity={identity}
                          onUpdate={() => setModalOpen(false)}
                        />
                      )
                    }
                    isIcon={true}
                  />
                )}
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
