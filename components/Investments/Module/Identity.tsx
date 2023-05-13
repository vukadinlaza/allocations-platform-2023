import { getFirstLetter } from '@/components/Avatar';
import Checkbox from '@/components/Checkbox';
import { UserInvestmentEntity } from '@/types';
import { Avatar } from '@mui/material';
import Image from 'next/image';

export default function InvestmentsIdentity({
  entities,
  onChange,
  selected
}: {
  entities: UserInvestmentEntity[];
  onChange: (v: any) => any;
  selected: any;
}) {
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
        <button className="text info">
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
