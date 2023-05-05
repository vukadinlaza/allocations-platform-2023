import Button from '@/components/Button';
import FormBuilder from '@/components/FormBuilder';
import supabase from '@/lib/supabase';
import CloseIcon from '@mui/icons-material/Close';
import { Card } from '@mui/material';
import { useState } from 'react';

interface NewOrganization {
  name: string;
}

const items: any = [
  {
    key: 'name',
    label: 'Name',
    type: 'string'
  }
];

export default function OrganizationForm({
  setOpenModal
}: {
  setOpenModal: any;
}) {
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

      setOpenModal(false);
    } catch (error) {
      console.log(error);
    } finally {
      setNewOrganization(null);
      setLoading(false);
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
      <main className="w-96">
        <FormBuilder
          items={items}
          loading={loading}
          onChange={(key, value) => setNewOrganization({ [key]: value })}
        />
        <Button
          loading={loading}
          disabled={loading}
          label={'Create'}
          onClick={createNew}
        />
      </main>
    </Card>
  );
}
