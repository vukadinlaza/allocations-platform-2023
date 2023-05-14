'use client';

import ItemsHeader from '@/components/Items/Header';
import Progress from '@/components/Items/Progress';
import { Deal } from '@/types';
import None from '../None';
import Price from '../Price';

export default function DealAdmin({ deal }: { deal?: Deal }) {
  const getProgress = () => {
    if (!deal) return;
    if (deal.target_raise_goal && deal.total_raised_amount) {
      return (deal.total_raised_amount / deal.target_raise_goal) * 100;
    }
    return 0;
  };
  return (
    <div className="container my-6 deal-admin">
      {!deal && <None text="No deal found." />}
      {deal && (
        <div>
          <ItemsHeader data={deal} />
          <Progress
            value={getProgress()}
            footer={
              <div className="flex items-start justify-between w-full mt-4">
                <div>
                  <p>Funds raised</p>
                  <div className="text-xl font-bold">
                    <Price price={deal.total_raised_amount} />
                  </div>
                </div>
                <div>
                  <p>Funds goal</p>
                  <div className="text-xl font-bold">
                    <Price price={deal.target_raise_goal} />
                  </div>
                </div>
              </div>
            }
          />
        </div>
      )}
    </div>
  );
}
