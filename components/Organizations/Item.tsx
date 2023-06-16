import { getFirstLetter, getFullName } from '@/lib/utils';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';

export default function OrganizationItem({
  organization,
  icon
}: {
  organization: any;
  icon?: any;
}) {
  return (
    <div className="item">
      <div className="items-center justify-center hidden mr-4 text-lg text-white rounded shadow-sm w-9 h-9 md:flex bg-primary-400">
        {organization.name && getFirstLetter(organization.name)}
      </div>
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
      <div className="flex items-center justify-end gap-2">
        <div className="relative flex items-center justify-end mx-2">
          {organization.organizations_roles
            .slice(0, 3)
            .map((role: any, index: number) => (
              <div key={index} style={{ width: 25, zIndex: index }}>
                <Tooltip title={role.user_email}>
                  <Avatar
                    className="mr-2 cursor-pointer"
                    sx={{
                      width: 32,
                      height: 32,
                      backgroundColor: '#3db278',
                      border: 1,
                      borderColor: 'white',
                      textTransform: 'capitalize'
                    }}
                  >
                    {role.users && getFirstLetter(getFullName(role.users))}
                  </Avatar>
                </Tooltip>
              </div>
            ))}
        </div>
        <div>
          {organization.organizations_roles &&
            organization.organizations_roles.length > 3 && (
              <span className="text-xs chip chip--small chip--info">
                + {organization.organizations_roles.length - 3}
              </span>
            )}
        </div>
        <div>{icon}</div>
      </div>
    </div>
  );
}
