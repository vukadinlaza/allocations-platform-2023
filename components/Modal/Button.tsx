'use client';

import Button from '@/components/Button';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
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
  button,
  onClose
}: {
  content?: any;
  title?: string;
  button?: any;
  onClose?: (boolean: any) => void;
}) {
  const [openModal, setOpenModal] = useState<boolean>(false);

  useEffect(() => {
    setOpenModal(false);
  }, [onClose]);
  return (
    <div>
      <Dialog
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
      <Button
        label={button?.label || 'Create new'}
        onClick={() => {
          setOpenModal(true);
        }}
      />
    </div>
  );
}
