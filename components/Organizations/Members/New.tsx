import Button from '@/components/Button';
import { isValidEmail } from '@/components/Login';
import Select from '@/components/Select';
import { useSupabase } from '@/lib/supabase-provider';
import { organizations_roles } from '@/types/values';
import { Alert } from '@mui/material';
import { useAuthContext } from 'app/(private)/context';
import { useEffect, useState } from 'react';

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
  const [loading, setLoading] = useState<boolean>(false);

  const isInvite = async () => {
    // does user exist? if not, invite, if yes return false
    if (!email) return true;
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (!data) {
      let { data, error } = await supabase.from('users').insert({ email });
      return true;
    }
    return false;
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
    setAlreadyMember(false);
    if (!isValidEmail(email)) return alert('Please enter a valid email');
    try {
      setLoading(true);

      // if already member, stop
      const already_member = await isMember();
      if (already_member) return;

      const is_invite = await isInvite();

      const { data, error } = await supabase
        .from('organizations_roles')
        .insert({
          user_email: email,
          organization_id: organizationId,
          type: role,
          is_invite
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

  useEffect(() => {
    setAlreadyMember(false);
  }, [email]);

  return (
    <div className="w-full mb-4" style={{ minWidth: 400, maxWidth: 400 }}>
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
