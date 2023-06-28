import ChipStatus from '@/components/ChipStatus';
import None from '@/components/None';
import UserItem from '@/components/User/Item';
export default function OrganizationMembersList({
  members = [],
  content
}: {
  members: any;
  content?: any;
}) {
  return (
    <>
      {members.length === 0 && <None text="No member yet." />}
      {members.length > 0 && (
        <div className="grid gap-2">
          {members &&
            members.map((member: any, key: number) => (
              <div key={key} className="cursor-pointer">
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
      )}
    </>
  );
}
