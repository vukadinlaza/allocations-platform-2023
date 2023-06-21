'use client';

import Button from '@/components/Button';
import ItemsHeader from '@/components/Deals/Header';
import DealInvite from '@/components/Deals/Invite';
import Progress from '@/components/Items/Progress';
import ModalBox from '@/components/Modal';
import Price from '@/components/Price';
import { Deal } from '@/types';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import Image from 'next/image';
import React, { useState } from 'react';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function DealAdminHeader({ deal }: { deal: Deal }) {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const getProgress = () => {
    if (!deal) return;
    if (deal.target_raise_goal && deal.total_raised_amount) {
      return (deal.total_raised_amount / deal.target_raise_goal) * 100;
    }
    return 0;
  };

  const [loading, setLoading] = useState<boolean>(true);
  return (
    <header>
      <div className="flex items-start justify-between">
        <ItemsHeader deal={deal} />
        <Button
          disabled={
            deal.status === 'draft' ||
            deal.status === 'submitted' ||
            deal.status === 'pending'
          }
          loading={false}
          label={'Invite to invest'}
          onClick={() => setOpenModal(true)}
          icon={
            <Image
              src={'/invite.svg'}
              alt="invite"
              className="opacity-50 invert"
              width={20}
              height={20}
            />
          }
        />
      </div>
      <Progress
        value={getProgress() || ''}
        footer={
          <div className="flex items-start justify-between w-full mt-4">
            <div>
              <p>Total subscribed</p>
              <div className="text-xl font-bold">
                {(deal.total_raised_amount && (
                  <Price price={deal.total_raised_amount} />
                )) ||
                  '$0'}
              </div>
            </div>
            <div>
              <p>Funds goal</p>
              <div className="text-xl font-bold">
                {(deal.target_raise_goal && (
                  <Price price={deal.target_raise_goal} />
                )) ||
                  '$0'}
              </div>
            </div>
          </div>
        }
      />
      <Dialog
        open={openModal}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <ModalBox
          title={'Invite by email'}
          onClose={() => setOpenModal(false)}
          content={
            <DealInvite deal={deal} onClose={() => setOpenModal(false)} />
          }
        />
      </Dialog>
    </header>
  );
}
