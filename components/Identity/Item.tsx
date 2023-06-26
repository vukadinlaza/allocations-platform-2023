import Checkbox from '@/components/Checkbox';
import DateComponent from '@/components/DateComponent';
import EditIdentity from '@/components/Identity/Edit';
import { getFirstLetter, isIdentityValid } from '@/lib/utils';
import Avatar from '@mui/material/Avatar';
import { useState } from 'react';
import ChipStatus from '../ChipStatus';
import ModalButton from '../Modal/Button';

export const checkStatus = (identity: any) => {
  const valid: any = isIdentityValid(identity);
  if (!valid.success) return 'pending';
  return 'success';
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

  return (
    <>
      {identity && (
        <div
          className="item"
          onClick={() => {
            if (editable && !modalOpen && checkStatus(identity) !== 'success')
              setModalOpen(true);
            if (checkStatus(identity) === 'success') {
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
                {editable && checkStatus(identity) !== 'success' && (
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
              <div className="flex items-center justify-end col-span-8 gap-2">
                {checkStatus(identity) !== 'success' && (
                  <ChipStatus status={checkStatus(identity)} />
                )}
                <Checkbox
                  disabled={
                    identity.kyc_status !== 'success' &&
                    identity.kyc_status !== 'queued'
                  }
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
