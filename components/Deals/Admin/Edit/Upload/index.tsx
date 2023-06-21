'use client';
import { Deal } from '@/types';
import UploadPitchdeck from './Pitchdeck';
import UploadTermSheet from './TermSheet';
import UploadWireInstructions from './WireInstructions';

export default function DealSetup({ deal }: { deal: Deal }) {
  return (
    <div className="grid gap-4">
      <div className="grid px-6 py-4 overflow-hidden bg-white border rounded-lg">
        <UploadPitchdeck dealId={deal.id} />
        <UploadTermSheet dealId={deal.id} />
        <UploadWireInstructions dealId={deal.id} />
      </div>
    </div>
  );
}
