import Round from './Round';

export default function UserItem() {
  return (
    <div className="flex items-center justify-center gap-4">
      <div className="w-40 h-6">
        <div className="w-full h-full rounded-xl loading"></div>
      </div>
      <Round />
    </div>
  );
}
