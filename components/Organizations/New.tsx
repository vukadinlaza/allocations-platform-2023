import { useAuthContext } from '@/app/context';
import Button from '@/components/Button';
import FormBuilder from '@/components/FormBuilder';
import { useSupabase } from '@/lib/supabase-provider';
import CloseIcon from '@mui/icons-material/Close';
import { Card } from '@mui/material';
import { useState } from 'react';

interface NewOrganization {
  name: string;
  user_id: string;
}

const model: any = [
  {
    key: 'name',
    label: 'Name',
    type: 'string'
  }
];

export default function OrganizationNew({
  open,
  setOpenModal
}: {
  open: any;
  setOpenModal: any;
}) {
  const {supabase} = useSupabase();
  const { user, notify } = useAuthContext();
  const [newOrganization, setNewOrganization] = useState<NewOrganization | any>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);

  const createNew = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('organizations')
        .insert(newOrganization);

      if (error) {
        notify('Sorry, could not create the organization.', false);
        return;
      }
      notify('Successfully created !', true);
    } catch (error) {
      console.log(error);
      notify('Sorry, could not create the organization.', false);
    } finally {
      setNewOrganization(null);
      setLoading(false);
      setOpenModal(false);
    }
  };
  return (
    <Card className="mb-0 card--popup" variant="outlined">
      <header>
        <h2>Create a new organization</h2>
        <CloseIcon
          fontSize="inherit"
          className="text-2xl cursor-pointer text-gray"
          onClick={() => setOpenModal(false)}
        />
      </header>
      {open && (
        <main className="w-96">
          <FormBuilder
            data={newOrganization}
            model={model}
            loading={loading}
            onChange={setNewOrganization}
          />
          <Button
            loading={loading}
            disabled={loading}
            label={'Create'}
            onClick={createNew}
          />
        </main>
      )}
    </Card>
  );
}
