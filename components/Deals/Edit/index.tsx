'use client';
import { Deal } from '@/types';
import Image from 'next/image';
import { useState } from 'react';
import DealProductSetup from './Product';
import DealSetup from './Setup';
import DealUpload from './Upload';

export default function DealEdit({ deal }: { deal: Deal }) {
  const [active, setActive] = useState<string>('Deal Setup');

  const steps = [
    {
      name: 'Product Setup',
      is_valid: false
    },
    {
      name: 'Deal Setup',
      is_valid: false
    },
    {
      name: 'Upload Documents',
      is_valid: false
    },
    {
      name: 'Legal Formations',
      is_valid: false
    },
    {
      name: 'Review & Submit',
      is_valid: false
    }
  ];

  return (
    <div className="flex items-start gap-4">
      <div
        className="grid gap-2 p-1 bg-white border rounded-lg"
        style={{ minWidth: 250 }}
      >
        {steps.map((step: any, index: any) => (
          <div
            key={index}
            className={`flex items-center justify-between gap-8 px-4 py-2 text-sm font-medium rounded-lg cursor-pointer  ${
              active === step.name
                ? 'bg-primary-500 text-white'
                : ' hover:bg-gray-50'
            }`}
            onClick={() => setActive(step.name)}
          >
            <span>{step.name}</span>
            <Image
              src={
                step.is_valid
                  ? '/checked_rounded.svg'
                  : '/checked_rounded_empty.svg'
              }
              alt="checked"
              className={`${step.is_valid ? '' : 'opacity-25'} `}
              width={16}
              height={16}
            />
          </div>
        ))}
      </div>
      <div className="w-full">
        {active === 'Product Setup' && <DealProductSetup deal={deal} />}
        {active === 'Deal Setup' && <DealSetup deal={deal} />}
        {active === 'Upload Documents' && <DealUpload deal={deal} />}
      </div>
    </div>
  );
}
