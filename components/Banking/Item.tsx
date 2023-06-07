import { getFirstLetter } from '@/lib/utils';
import ChipStatus from '../ChipStatus';

export default function BankAccountItem({
  bank_account
}: {
  bank_account: any;
}) {
  return (
    <div className="flex items-center justify-between w-full p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
      <div className="items-center justify-center hidden w-8 h-8 mr-4 text-lg text-white rounded md:flex bg-primary-400">
        {getFirstLetter(bank_account.bank_name)}
      </div>
      <div className="flex flex-col grow">
        <span className="text-xs text-gray-500">Bank account name</span>
        <p>{bank_account.bank_name}</p>
      </div>
      <div>
        <ChipStatus small={true} status={bank_account.status} />
      </div>
    </div>
  );
}
