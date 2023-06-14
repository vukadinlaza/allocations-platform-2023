import { getFirstLetter } from '@/lib/utils';
import Avatar from '@mui/material/Avatar';

export default function OrganizationItem({
  organization,
  content
}: {
  organization: any;
  content?: any;
}) {
  return (
    <div className="flex items-center justify-between w-full px-3 py-2 border rounded-lg cursor-pointer hover:bg-gray-50">
      <Avatar
        className="mr-2 cursor-pointer"
        sx={{
          width: 32,
          height: 32,
          backgroundColor: '#3db278',
          textTransform: 'capitalize'
        }}
      >
        {organization.name && getFirstLetter(organization.name)}
      </Avatar>
      <div className="grid items-start pr-2 grow">
        {organization.name && (
          <p className="text-sm font-medium truncate">
            {organization.name && organization.name.length > 1
              ? organization.name
              : 'No name'}
          </p>
        )}
        {organization.organizations_roles && (
          <label className="text-xs">
            {organization.organizations_roles.length || 1} members
          </label>
        )}
      </div>
      {content && (
        <div className="flex flex-col items-end justify-end">{content}</div>
      )}
    </div>
  );
}
