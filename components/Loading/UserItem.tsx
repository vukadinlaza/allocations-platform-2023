import Line from './Line';
import Round from './Round';

export default function UserItem() {
  return (
    <div className="flex items-center justify-between w-1/2 w-full my-2">
      <Line />
      <Round />
    </div>
  );
}
