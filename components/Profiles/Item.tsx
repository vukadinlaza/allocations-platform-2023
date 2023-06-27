import Checkbox from '@/components/Checkbox';
import DateComponent from '@/components/DateComponent';
import { getFirstLetter, isIdentityValid } from '@/lib/utils';
import { investment_identity_types } from '@/types/values';
import Avatar from '@mui/material/Avatar';
import { useState } from 'react';
import ChipStatus from '../ChipStatus';
import ModalButton from '../Modal/Button';
import NewEntity from './New/Entity';
import NewIndividual from './New/Individual';

export const checkStatus = (identity: any) => {
  const valid: any = isIdentityValid(identity);
  if (!valid.success) return 'missing_data';
  if (identity.status === 'queued') return 'pending';
  return 'success';
};

export default function ProfileItem({
  identity,
  onChange,
  select = false,
  selectedId,
  details = false,
  editable
}: {
  identity: any;
  onChange: (identity: any) => void;
  selectedId?: string | null;
  select?: any;
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
            if (editable && !modalOpen) setModalOpen(true);
            if (onChange) {
              onChange(selectedId === identity.id ? null : identity.id);
            }
          }}
        >
          <div className="grid items-center w-full grid-cols-12 gap-2">
            <div
              className={`flex items-center ${
                details ? 'col-span-4' : 'col-span-8'
              }`}
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
                <span className="text-xs text-gray-600">
                  {identity.type} — {identity.country}
                </span>
              </div>
            </div>
            {details && (
              <div className="grid grid-cols-8 col-span-8">
                <div className="col-span-2">
                  <label>{identity.entity_type}</label>
                </div>
                <div className="col-span-2">
                  <label>
                    <DateComponent date={identity.created_at} />
                  </label>
                </div>
                <div className="col-span-2">
                  <label>{identity.tax_id}</label>
                </div>
                <div className="flex items-center justify-end col-span-2">
                  <ChipStatus status={checkStatus(identity)} />
                  <div className="flex justify-end w-6">
                    {editable && (
                      <ModalButton
                        isOpen={modalOpen}
                        onChange={setModalOpen}
                        title="Edit your investor profile"
                        content={
                          modalOpen && (
                            <>
                              {identity.entity_type ===
                                investment_identity_types[0] && (
                                <NewIndividual
                                  code={checkStatus(identity)}
                                  identity={identity}
                                  onCreate={() => setModalOpen(false)}
                                />
                              )}
                              {identity.entity_type !==
                                investment_identity_types[0] && (
                                <NewEntity
                                  code={checkStatus(identity)}
                                  identity={identity}
                                  onCreate={() => setModalOpen(false)}
                                />
                              )}
                            </>
                          )
                        }
                        isIcon={true}
                      />
                    )}
                  </div>
                </div>
              </div>
            )}
            {!details && (
              <div className={`flex items-center justify-end col-span-4 gap-2`}>
                <ChipStatus
                  small={select ? true : false}
                  status={checkStatus(identity)}
                />
                <Checkbox selected={selectedId === identity.id} />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
