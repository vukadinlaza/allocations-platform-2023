'use client';

import None from '../None';
import SPVS from './SPVs';

const getComponent = (data: any) => {
  const { type } = data;
  if (!type) return <None text="No information found. Please try again." />;
  if (type === 'spvs') return <SPVS data={data} />;
  return <None text="No information found. Please try again." />;
};

export default function SlideOverContent({ data }: { data: any }) {
  const content = data.data;
  return (
    <div className="slideover">
      {!data && !content && <h1>No information.</h1>}
      {data && content && (
        <div className="slideover--component">{getComponent(data)}</div>
      )}
    </div>
  );
}
