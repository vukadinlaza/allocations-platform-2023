import Overview from '@/components/SPVs/Overview';
import Tabs from '@/components/Tabs';
import { TabData } from '@/types';
import SlideOverHeader from './Header';

const tabs_spvs: TabData[] = [
  {
    title: 'Overview',
    disabled: false,
    component: Overview
  },
  {
    title: 'Investors',
    disabled: true
  },
  {
    title: 'Wires',
    disabled: true
  },
  {
    title: 'Taxes',
    disabled: true
  },
  {
    title: 'Migrations',
    disabled: true
  }
];

export default function SPVsSlideOver({ data }: { data: any }) {
  const content = data.data;

  return (
    <div className="slideover--spvs">
      {content && <SlideOverHeader content={content} />}
      {tabs_spvs && <Tabs tabs={tabs_spvs} />}
    </div>
  );
}
