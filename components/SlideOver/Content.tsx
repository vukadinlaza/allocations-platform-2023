'use client';

import MissingData from '@/components/MissingData';
import None from '@/components/None';
import SPVS from './SPVs';

const getComponent = (data: any) => {
  const { type } = data;
  if (!type) return <MissingData />;
  if (type === 'spvs') return <SPVS data={data} />;
  return <None text="No information found. Please try again." />;
};

export default function SlideOverContent({ data }: { data: any }) {
  const content = data.data;
  return (
    <div className="slideover">
      {!data && !content && <MissingData />}
      {data && content && (
        <div className="slideover--component">{getComponent(data)}</div>
      )}
    </div>
  );
}
