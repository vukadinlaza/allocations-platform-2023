'use client';

interface MoneyProps {
  amount: number;
  onChange: (amount: number) => void;
}

export default function Money({ amount, onChange }: MoneyProps) {
  return (
    <div className="flex items-center w-full mr-2 overflow-hidden border rounded">
      <div className="px-3 py-2 mr-2 font-medium bg-gray-100">$</div>
      <input
        value={amount || 0}
        type="text"
        className="w-full outline-0 ring-0 money"
        placeholder="0"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange(parseFloat(e.target.value))
        }
      />
    </div>
  );
}
