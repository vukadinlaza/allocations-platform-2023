'use client';
import EntitiesItem from '@/components/Entities/Item';
import { useState } from 'react';
import ChipStatus from '../ChipStatus';
import None from '../None';

export default function EntitiesList({
  entities = [],
  content
}: {
  entities: any;
  content?: any;
}) {
  const [loading, setLoading] = useState<boolean>(true);
  return (
    <>
      {entities.length === 0 && <None text="No entities yet." />}
      {entities.length > 0 && (
        <div className="grid gap-2">
          <h1>You currently have {entities.length} entities.</h1>
          {entities.map((entity: any, key: number) => (
            <div key={key} className="cursor-pointer">
              <EntitiesItem
                entity={entity}
                content={
                  <div className="flex gap-2">
                    <ChipStatus status="Completed" />
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
