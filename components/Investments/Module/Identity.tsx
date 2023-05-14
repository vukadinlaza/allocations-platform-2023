import { getFirstLetter } from '@/components/Avatar';
import Button from '@/components/Button';
import Checkbox from '@/components/Checkbox';
import { useSupabase } from '@/lib/supabase-provider';
import { UserInvestmentEntity } from '@/types';
import { Avatar } from '@mui/material';
import Image from 'next/image';
import { useState } from 'react';

export default function InvestmentsIdentity({
  entities,
  onChange,
  selected,
  onUpdate
}: {
  entities: UserInvestmentEntity[];
  onChange: (v: any) => any;
  onUpdate: () => any;
  selected: any;
}) {
  const { supabase, user } = useSupabase();
  const [name, setName] = useState<string>('');
  const [show, setShow] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const saveNewEntity = async () => {
    if (!name && name === '' && name.length < 3) alert('Please enter a name');
    try {
      setLoading(true);
      const { data } = await supabase
        .from('users_investment_entities')
        .insert({ name })
        .select();

      if (data) {
        onUpdate();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <header className="mb-6">
        <h2 className="text-lg font-bold">Who is investing?</h2>
        <p className="text-sm">You have no identity yet.</p>
      </header>
      <main>
        <div>
          {entities && (
            <div>
              {entities.map((entity: UserInvestmentEntity, index: number) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 mb-4 border rounded cursor-pointer hover:bg-gray-50"
                  onClick={() => onChange(entity)}
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
                    {getFirstLetter(entity.name)}
                  </Avatar>
                  <div className="grow">
                    {entity.name && <p>{entity.name}</p>}
                  </div>
                  <Checkbox selected={selected === entity.id} />
                </div>
              ))}
            </div>
          )}
        </div>
        {show && (
          <div className="flex items-center gap-2 mb-4">
            <input
              type="text"
              placeholder="New entity name"
              onChange={(e) => setName(e.target.value)}
            />
            <Button
              loading={loading}
              label="Save"
              onClick={() => saveNewEntity()}
            />
          </div>
        )}
        {!loading && (
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
        )}
      </main>
    </div>
  );
}
