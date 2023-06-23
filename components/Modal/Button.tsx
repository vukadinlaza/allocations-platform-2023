'use client';

import Button from '@/components/Button';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import ModalBox from './index';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ModalButton({
  content,
  title,
  label = 'Create new',
  isOpen = false,
  onChange,
  icon,
  isIcon = false
}: {
  content?: any;
  title?: string;
  label?: string;
  isOpen?: boolean;
  onChange?: (boolean: any) => void;
  icon?: any;
  isIcon?: boolean;
}) {
  const [openModal, setOpenModal] = useState<boolean>(false);

  useEffect(() => {
    if (onChange) onChange(openModal);
  }, [openModal]);

  useEffect(() => {
    setOpenModal(isOpen);
  }, [isOpen]);

  return (
    <div>
      <Dialog
        scroll="body"
        open={openModal}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <ModalBox
          title={title}
          onClose={() => setOpenModal(false)}
          content={content}
        />
      </Dialog>
      {!isIcon && (
        <Button
          icon={icon}
          label={label}
          onClick={() => {
            setOpenModal(true);
          }}
        />
      )}
      {isIcon && (
        <Image
          src="/settings.svg"
          alt={'settings'}
          className="opacity-50"
          width={18}
          height={18}
        />
      )}
    </div>
  );
}
