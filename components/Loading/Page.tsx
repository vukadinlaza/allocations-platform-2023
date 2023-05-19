import Line from './Line';
import List from './List';

export default function Page() {
  return (
    <div className="w-full h-full">
      <div>
        <header className="flex items-start justify-between w-full gap-4 mb-6">
          <div className="flex flex-col items-start gap-4">
            <div className="w-64 h-8">
              <Line />
            </div>
            <div className="w-48 h-8">
              <Line />
            </div>
            <div className="w-24 h-6">
              <Line />
            </div>
          </div>
          <div className="w-40 h-8">
            <Line />
          </div>
        </header>
        <List />
      </div>
    </div>
  );
}
