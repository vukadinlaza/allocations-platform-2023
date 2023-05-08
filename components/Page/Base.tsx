'use client';
import PageList from '@/components/Page/List';
import { Card, Dialog, Slide } from '@mui/material';
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

export default function PageBase({
  content,
  data,
}: any) {
  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <Card className="card" variant="outlined">
      {content.dialog && (
        <Dialog
          open={openModal}
          TransitionComponent={Transition}
          keepMounted
          aria-describedby="alert-dialog-slide-description"
        >
          {content.dialog.component && (
            <content.dialog.component
              setOpenModal={setOpenModal}
              open={openModal}
            />
          )}
        </Dialog>
      )}
      {content.header && (
        <header>
          <div>
            <h1 className="mb-2">
              <span className="mr-2">{content.header.name || 'No title'}</span>
              <div className="chip chip--small chip--info">
                {data.length || 0}
              </div>
            </h1>
            <p>{content.header.description || 'No description'}</p>
          </div>
          <div>
            {content.header.buttons &&
              content.header.buttons.map((button: any) => (
                <button
                  key={button.title}
                  disabled={button.disabled}
                  className="btn primary"
                  onClick={() => {
                    if (!button.action) return;
                    if (button.action === 'modal') {
                      setOpenModal(true);
                    }
                  }}
                >
                  {button.title}
                </button>
              ))}
          </div>
        </header>
      )}
      <PageList
        header={content.header}
        headersTable={content.headersTable}
        data={data}
      />
    </Card>
  );
}
