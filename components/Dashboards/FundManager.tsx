import { useState } from 'react';
import LoadingDashboard from '../Loading/Dashboard';

export default function FundManagerDashboard() {
  const [loading, setLoading] = useState<boolean>(true);
  return <div className="w-full">{loading && <LoadingDashboard />}</div>;
}
