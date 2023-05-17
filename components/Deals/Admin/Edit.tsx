import { Deal } from '@/types';
import { useState } from 'react';
export default function DealEdit({ deal }: { deal?: Deal }) {
  const [loading, setLoading] = useState<boolean>(true);
  return <div>DealAdminProgress</div>;
}
