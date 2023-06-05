import KYC from '@/components/Identity/KYC';

export default function NewIndividual({ onUpdate }: { onUpdate: () => void }) {
  return (
    <div className="new--individual">
      <KYC onUpdate={onUpdate} />
    </div>
  );
}
