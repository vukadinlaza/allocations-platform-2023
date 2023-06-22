import Button from '@/components/Button';
import { useSupabase } from '@/lib/supabase-provider';
import { Field } from '@/types';
import {
  deal_master_series_priorities,
  deal_master_series_structures
} from '@/types/values';
import { useAuthContext } from 'app/(private)/context';
import { useState } from 'react';
import Checkbox from '../Checkbox';
import { getPricing } from '../Deals/Admin/Edit/Submit/EstimatedCost';
import FormBuilder from '../FormBuilder';
import Price from '../Price';
import RadioGroup from '../RadioGroup';
import Upload from '../Upload';

type Props = {
  onCreate: () => void;
  organizationId: string | undefined;
};

export default function NewMasterSeries({ onCreate, organizationId }: Props) {
  const { supabase, saveInvoice } = useSupabase();
  const { user, notify } = useAuthContext();
  const [newMasterSeries, setNewMasterSeries] = useState<any>({
    name: '',
    is_creating: false,
    is_upkeep: false,
    is_standalone: false,
    master_entity_legal_structure: 'LLC',
    priority: 'Standard',
    organization_id: organizationId
  });
  const [loading, setLoading] = useState<boolean>(false);

  const model: Field[] = [
    {
      label: 'Legal name',
      key: 'name',
      type: 'string',
      show: true
    },
    {
      label: 'Entity Legal Structure',
      key: 'master_entity_legal_structure',
      type: 'select',
      items: deal_master_series_structures,
      show: true
    }
  ];

  const createNew = async () => {
    if (!newMasterSeries.organization_id)
      return alert(
        'Sorry, you should first add an organization to create a new entity'
      );
    if (!user && !organizationId) return;
    try {
      setLoading(true);

      const { data, error } = await supabase
        .from('master_series')
        .insert({
          ...newMasterSeries,
          user_email: user.email
        })
        .select()
        .single();

      setNewMasterSeries({});

      if (error) {
        notify(`Sorry, could not create new master series.`, false);
        return;
      }
      notify('Successfully created!', true);

      const { data: invoice } = await saveInvoice({
        type: 'master_series',
        user_email: user.email,
        item_id: data.id,
        amount: calculateTotal(),
        organization_id: organizationId
      });

      console.log(invoice);

      onCreate();
    } catch (error) {
      console.log(error);
      notify(`Sorry, could not create new master series.`, false);
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = () => {
    let total = 0;

    if (newMasterSeries.is_upkeep) total += 500;

    if (newMasterSeries.is_creating) total += 1000;

    switch (newMasterSeries.priority) {
      case 'Expedited':
        total += 450;
        break;
      case 'Super Rush':
        total += 600;
        break;
      default:
        break;
    }
    return total;
  };

  return (
    <div className="w-full mb-2">
      <div className="grid gap-4 mb-4">
        <FormBuilder
          data={newMasterSeries}
          model={model}
          emit={true}
          onSubmit={(v: any) => {
            const { name, master_entity_legal_structure } = v;
            setNewMasterSeries((prev: any) => ({
              ...prev,
              name,
              master_entity_legal_structure
            }));
          }}
        />
        <div>
          <label>Upload your certificate of formation</label>
          <Upload />
        </div>
        <Checkbox
          selected={newMasterSeries.is_upkeep}
          onChange={() =>
            setNewMasterSeries((prev: any) => ({
              ...prev,
              is_upkeep: !newMasterSeries.is_upkeep
            }))
          }
          label="Would you like Allocations to perform Upkeep for this entity? — $500/year charge"
        />
        <Checkbox
          selected={newMasterSeries.is_creating}
          onChange={() =>
            setNewMasterSeries((prev: any) => ({
              ...prev,
              is_creating: !newMasterSeries.is_creating
            }))
          }
          label="Create this entity for me — $1000"
        />
        <Checkbox
          selected={newMasterSeries.is_standalone}
          onChange={() =>
            setNewMasterSeries((prev: any) => ({
              ...prev,
              is_standalone: !newMasterSeries.is_standalone
            }))
          }
          label="Create as a standalone entity"
        />
      </div>
      {newMasterSeries.is_creating && (
        <div className="grid">
          <label>Priority</label>
          <RadioGroup
            selected={newMasterSeries.priority}
            options={deal_master_series_priorities}
            onChange={(priority: any) => {
              if (priority !== newMasterSeries.priority) {
                setNewMasterSeries((prev: any) => ({
                  ...prev,
                  priority
                }));
              }
            }}
          />
        </div>
      )}
      <div className="grid gap-2 my-4">
        {newMasterSeries.is_upkeep && getPricing('Entity upkeep')}
        {newMasterSeries.is_creating && getPricing('Entity creation')}
        {newMasterSeries.priority === deal_master_series_priorities[1].value &&
          getPricing('Expedited priority')}
        {newMasterSeries.priority === deal_master_series_priorities[2].value &&
          getPricing('Super rush priority')}
      </div>
      <div className="mt-4">
        <Button
          loading={loading}
          disabled={
            !newMasterSeries.name ||
            !newMasterSeries.master_entity_legal_structure
          }
          label={
            <>
              <span>Create – </span>
              <Price price={calculateTotal()} />
            </>
          }
          onClick={createNew}
        />
      </div>
    </div>
  );
}
