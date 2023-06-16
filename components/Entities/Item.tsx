import { getFirstLetter } from '@/lib/utils';

export default function EntitiesItem({
  entity,
  content
}: {
  entity: any;
  content?: any;
}) {
  return (
    <div className="item">
      <div className="items-center justify-center hidden mr-4 text-lg text-white rounded-lg shadow-sm w-9 h-9 md:flex bg-primary-400">
        {entity?.name && getFirstLetter(entity.name)}
      </div>
      <div className="grid items-start pr-2 cursor-pointer grow">
        <span className="text-sm font-medium truncate">
          {entity && entity.name}
        </span>
        <div className="flex gap-2">
          {entity.fund_manager && (
            <label className="truncate cursor-pointer">
              Manager: {entity.fund_manager || entity.user_email}
            </label>
          )}
        </div>
      </div>
      {content && (
        <div className="flex flex-col items-end justify-end">{content}</div>
      )}
    </div>
  );
}
