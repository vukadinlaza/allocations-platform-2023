import Button from '@/components/Button';
import { isValidEmail } from '@/components/Login';
import Select from '@/components/Select';
import { useSupabase } from '@/lib/supabase-provider';
import { organizations_roles } from '@/types/values';
import { Alert } from '@mui/material';
import { useAuthContext } from 'app/(private)/context';
import { useState } from 'react';

type Props = {
  onCreate: () => void;
  onClose?: () => void;
  organizationId: string;
};

export default function NewOrganizationMember({
  onCreate,
  onClose,
  organizationId
}: Props) {
  const { supabase } = useSupabase();
  const { notify } = useAuthContext();
  const [email, setEmail] = useState<string>('');
  const [role, setRole] = useState<string>(organizations_roles[1]);
  const [alreadyMember, setAlreadyMember] = useState<boolean>(false);
  const [exists, setExists] = useState<boolean | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  const isExisting = async () => {
    if (!email) return true; // prevent insert
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    console.log(data);

    if (!data) {
      setExists(true);
      return false;
    }
    return true;
  };

  const isMember = async () => {
    if (!organizationId) return true; // prevent insert
    const { data, error } = await supabase
      .from('organizations_roles')
      .select('*')
      .eq('user_email', email)
      .eq('organization_id', organizationId)
      .single();

    if (data) {
      setAlreadyMember(true);
      return true;
    }
    return false;
  };

  const createNew = async () => {
    if (!isValidEmail(email)) return alert('Please enter a valid email');
    try {
      setLoading(true);

      // check if user exists
      const is_existing = await isExisting();
      if (!is_existing) return;

      // check if user is already member
      const already_member = await isMember();
      if (already_member) return;

      const { data, error } = await supabase
        .from('organizations_roles')
        .insert({
          user_email: email,
          organization_id: organizationId,
          is_invite: true
        });

      if (error) {
        notify(`Sorry, could not add a new member.`, false);
        return;
      }
      notify('Successfully added !', true);
      onCreate();
    } catch (error) {
      console.log(error);
      notify(`Sorry, could not add a new member.`, false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full mb-4" style={{ minWidth: 400 }}>
      <div className="flex flex-col gap-2 mb-4">
        <input
          type="text"
          placeholder={'member@email.com'}
          disabled={loading}
          className={`${loading ? 'disabled' : ''} w-full`}
          onChange={(e: any) => setEmail(e.target.value)}
        />
        <Select
          selected={role}
          items={organizations_roles}
          onChange={(role: any) => {
            setRole(role);
          }}
        />
        {exists && (
          <Alert severity="info" sx={{ maxWidth: 400 }}>
            <span className="font-bold">{email}</span> is not registered on our
            platform. Would you like to{' '}
            <span className="cta">send an invitation to join</span>?
          </Alert>
        )}
        {alreadyMember && (
          <Alert severity="warning">
            <span className="font-bold">{email}</span> is already a member of
            your organization.
          </Alert>
        )}
      </div>
      <div className="flex col-span-12 gap-2 md:col-span-2">
        <Button
          loading={loading}
          disabled={!isValidEmail(email) || !role}
          label={'Add to organization'}
          onClick={createNew}
        />
        {onClose && (
          <Button
            color="info"
            loading={loading}
            label={'Cancel'}
            onClick={() => {
              if (onClose) onClose();
            }}
          />
        )}
      </div>
    </div>
  );
}
