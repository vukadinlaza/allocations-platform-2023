import ChipStatus from '@/components/ChipStatus';
import UserItem from '@/components/UserItem';
import { useState } from 'react';
export default function OrganizationMembersList({
  members,
  content
}: {
  members: any;
  content?: any;
}) {
  const [loading, setLoading] = useState<boolean>(true);
  return (
    <div className="grid gap-2">
      {members &&
        members.map((member: any, key: number) => (
          <div key={key}>
            <UserItem
              user={member}
              content={
                <div className="flex gap-2">
                  <ChipStatus
                    status={member.role.toLowerCase().replace(' ', '_')}
                  />
                  {content}
                </div>
              }
            />
          </div>
        ))}
    </div>
  );
}
