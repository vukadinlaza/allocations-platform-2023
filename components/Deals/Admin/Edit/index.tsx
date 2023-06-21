'use client';
import { Deal } from '@/types';
import Image from 'next/image';
import { useState } from 'react';
import DealLegal from './Legal';
import DealProductSetup from './Product';
import DealSetup from './Setup';
import DealSubmit from './Submit';
import DealUpload from './Upload';

export default function DealEdit({ deal }: { deal: Deal }) {
  const [active, setActive] = useState<string>('Product Setup');
  const [steps, setSteps] = useState([
    {
      name: 'Product Setup',
      is_valid:
        deal.organization_id &&
        deal.fund_manager_email &&
        deal.sub_type &&
        deal.agree_msa
    },
    {
      name: 'Deal Setup',
      is_valid: deal.name && deal.minimum_investment && deal.memo
    },
    {
      name: 'Upload Documents',
      is_valid: true
    },
    {
      name: 'Legal Formations',
      is_valid:
        deal.legal_template_option && deal.offering_type && deal.investor_type
    },
    {
      name: 'Review & Submit',
      is_valid: deal.agree_costs && deal.agree_costs
    }
  ]);

  return (
    <div className="grid items-start gap-4 md:flex">
      <div
        className="grid gap-2 p-1 bg-white border rounded-lg"
        style={{ minWidth: 250 }}
      >
        {steps.map((step: any, index: any) => (
          <div
            key={index}
            className={`flex items-center justify-between gap-8 px-4 py-2 text-sm font-medium rounded-lg cursor-pointer  ${
              active === step.name
                ? 'bg-gray-200 text-black'
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
              className={`${step.is_valid ? 'opacity-100' : 'opacity-25'} `}
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
        {active === 'Legal Formations' && <DealLegal deal={deal} />}
        {active === 'Review & Submit' && <DealSubmit deal={deal} />}
      </div>
    </div>
  );
}
