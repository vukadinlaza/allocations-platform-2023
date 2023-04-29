import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab } from '@mui/material';
import { useState } from 'react';
import SlideOverHeader from './Header';

const tabs = [
  {
    title: 'Overview'
  },
  {
    title: 'Investors'
  },
  {
    title: 'Wires'
  },
  {
    title: 'Taxes'
  },
  {
    title: 'Migrations'
  }
];

export default function SPVsSlideOver({ data }: { data: any }) {
  const [loading, setLoading] = useState<boolean>(true);
  const [value, setValue] = useState('0');

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue.toString());
  };

  const content = data.data;

  return (
    <div className="spvs">
      {content && <SlideOverHeader content={content} />}
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            {tabs &&
              tabs.map((tab, index) => (
                <Tab key={index} label={tab.title} value={index.toString()} />
              ))}
          </TabList>
        </Box>
        {tabs &&
          tabs.map((tab, index) => (
            <TabPanel key={index} value={index.toString()}>
              {tab.title}
            </TabPanel>
          ))}
      </TabContext>
    </div>
  );
}
