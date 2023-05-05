'use client';

import { headers_tables } from '@/app/config';
import PageList from '@/components/PageList';
import { Slide } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import React, { useState } from 'react';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Organizations() {
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
      {/* <OrganizationForm />
      <Dialog
        open={openModal}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpenModal(false)}
        aria-describedby="alert-dialog-slide-description"
      >
        <OrganizationForm />
      </Dialog> */}
      <PageList
        header={getHeader()}
        headersTable={headers_tables.organizations}
        table="organizations"
        query={`*, entities ( * )`}
      />
    </div>
  );
}
