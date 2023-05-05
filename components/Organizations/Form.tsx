import Button from '@/components/Button';
import FormBuilder from '@/components/FormBuilder';
import { Card } from '@mui/material';
import { useState } from 'react';

interface NewOrganization {
  name: string;
}

export default function OrganizationForm() {
  const [newOrganization, setNewOrganization] =
    useState<NewOrganization | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const items = [
    {
      key: 'name',
      label: 'Name',
      type: 'string'
    }
  ];

  const createNew = () => {};
  return (
    <Card className="card" variant="outlined">
      <header>
        <h2>Create a new organization</h2>
      </header>
      <main>
        <FormBuilder items={items} values={newOrganization} />
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
