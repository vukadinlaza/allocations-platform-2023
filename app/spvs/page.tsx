'use client';
import PageList from '@/components/Page/List';
import { Field } from '@/types';
import { deal_types, true_false } from '@/types/values';
import { headers_tables } from '../config';
import { useAuthContext } from '../context';

export default function SPVS() {
  const { user } = useAuthContext();

  const header = {
    name: 'SPVs',
    description: 'Manage your spvs.',
    buttons: [
      {
        title: 'Create new',
        action: 'modal'
      }
    ]
  };

  const model: Field[] = [
    {
      key: 'name',
      label: 'Name',
      type: 'string',
      show: true
    },
    {
      key: 'id',
      label: 'ID',
      type: 'string',
      show: user.is_super_admin,
      disabled: true,
      copy: true
    },
    {
      key: 'mongo_id',
      label: 'Mongo ID (deprecated)',
      type: 'string',
      show: user.is_super_admin,
      disabled: true,
      copy: true
    },
    {
      key: 'created_at',
      label: 'Creation date',
      type: 'date',
      show: user.is_super_admin,
      disabled: true,
      copy: true
    },
    {
      key: 'accept_crypto',
      label: 'Accept Crypto',
      type: 'select',
      show: user.is_super_admin,
      disabled: false,
      items: true_false
    },
    {
      key: 'asset_id',
      label: 'Asset ID',
      type: 'string',
      show: user.is_super_admin,
      disabled: false
    },
    {
      key: 'carry_fee',
      label: 'Carry Fee',
      type: 'number',
      show: user.is_super_admin,
      disabled: false
    },
    {
      key: 'closing_date',
      label: 'Closing Date',
      type: 'date',
      show: user.is_super_admin,
      disabled: false
    },
    {
      key: 'company_name',
      label: 'Company Name',
      type: 'string',
      show: user.is_super_admin,
      disabled: false
    },
    {
      key: 'deal_term',
      label: 'Deal Term',
      type: 'string',
      show: user.is_super_admin,
      disabled: false
    },
    {
      key: 'entity_id',
      label: 'Entity ID',
      type: 'string',
      show: user.is_super_admin,
      disabled: false
    },
    {
      key: 'entity_name',
      label: 'Entity Name',
      type: 'string',
      show: user.is_super_admin,
      disabled: false
    },
    {
      key: 'international_investors',
      label: 'International Investors',
      type: 'select',
      show: user.is_super_admin,
      disabled: false,
      items: true_false
    },
    {
      key: 'management_fee_frequency',
      label: 'Management Fee Frequency',
      type: 'number',
      show: user.is_super_admin,
      disabled: false
    },
    {
      key: 'management_fee_percent',
      label: 'Management Fee Percent',
      type: 'number',
      show: user.is_super_admin,
      disabled: false
    },
    {
      key: 'minimum_investment',
      label: 'Minimum Investment',
      type: 'number',
      show: user.is_super_admin,
      disabled: false
    },
    {
      key: 'offering_type',
      label: 'Offering Type',
      type: 'string',
      show: user.is_super_admin,
      disabled: false
    },
    {
      key: 'onboarding_link',
      label: 'Onboarding Link',
      type: 'string',
      show: user.is_super_admin,
      disabled: false
    },
    {
      key: 'series_name',
      label: 'Series Name',
      type: 'string',
      show: user.is_super_admin,
      disabled: false
    },
    {
      key: 'target_raise_goal',
      label: 'Target Raise Goal',
      type: 'number',
      show: user.is_super_admin,
      disabled: false
    },
    {
      key: 'total_carry',
      label: 'Total Carry',
      type: 'number',
      show: user.is_super_admin,
      disabled: false
    },
    {
      key: 'type',
      label: 'Type',
      type: 'select',
      show: user.is_super_admin,
      disabled: false,
      items: deal_types,
      value: 'spv'
    },
    {
      key: 'user_email',
      label: 'User Email',
      type: 'string',
      show: user.is_super_admin,
      disabled: false
    }
  ];

  const dialog = {
    element: 'SPV',
    table: 'deals',
    type: 'FormsNew'
  };

  return (
    <div>
      <PageList
        dialog={dialog}
        header={header}
        headersTable={headers_tables.spvs}
        model={model}
        query={`*`}
        queryType="spv"
        table="deals"
        type="spv"
      />
    </div>
  );
}
