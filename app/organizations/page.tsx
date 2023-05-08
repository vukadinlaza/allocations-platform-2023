'use client';
import OrganizationForm from '@/components/Organizations/Form';
import PageListNew from '@/components/PageListNew';
import { Dialog, Slide } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import React, { useState } from 'react';
import { headers_tables } from '../config';
import { useAuthContext } from '../context';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Organizations() {
  const { user } = useAuthContext();

  const [openModal, setOpenModal] = useState<boolean>(false);

  const getHeader = () => {
    return {
      name: 'Organizations',
      description: 'Manage your organizations.',
      buttons: [
        {
          title: 'Create new',
          action: () => setOpenModal(true)
        }
      ]
    };
  };

  return (
    <div>
      <Dialog
        open={openModal}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <OrganizationForm setOpenModal={setOpenModal} open={openModal} />
      </Dialog>
      {user && user.organizations && (
        <PageListNew
          header={getHeader()}
          headersTable={headers_tables.organizations}
          data={user.organizations}
        />
      )}
    </div>
  );
}
