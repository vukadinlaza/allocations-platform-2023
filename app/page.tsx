"use client";
import { Card, Metric, Text, Flex, Grid, Title, BarList } from '@tremor/react';
import Chart from './chart';
import { supabase } from '../lib/supabase';
import { useCallback, useEffect, useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import CustomTable from '../components/banner';
 

const dataFormatter = (number: number) =>
  Intl.NumberFormat('us').format(number).toString();

const categories: {
  title: string;
  metric: string;
}[] = [
  {
    title: 'Total Raised',
    metric: '$ 14.8m',
  },
  {
    title: 'Estimated Multiple',
    metric: '2.7x',
  },
  {
    title: 'Total Private Funds',
    metric: '69',
  },
  {  title: 'Total Investors',
    metric: '1257',
  }
];


export default function PlaygroundPage() {



  const [organizationCount, setOrganizationCount] = useState(0);
  const getOrganizationCount = async ()=>{
    const { data } = await supabase.from('Organizations').select("*");
    if(data){
      setOrganizationCount(data.length);
    }
  }

  useEffect(() => {
    void getOrganizationCount();
  }, []);
  
  return (
    
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Card className="mt-6">
        <CustomTable />
      </Card>
      <Grid className="gap-6" numColsSm={2} numColsLg={3}>
        <Card>
          <Flex alignItems="start">
            <Text>Total AUM</Text>
          </Flex>
          <Flex
            className="space-x-3 truncate"
            justifyContent="start"
            alignItems="baseline"
          >
            <Metric>$40.4m</Metric>
          </Flex>
        </Card>
        {categories.map((item) => (
          <Card key={item.title}>
            <Flex alignItems="start">
              <Text>{item.title}</Text>
            </Flex>
            <Flex
              className="space-x-3 truncate"
              justifyContent="start"
              alignItems="baseline"
            >
              <Metric>{item.metric}</Metric>
            </Flex>
          </Card>
        ))}
      </Grid>
      <Card className="mt-6">
     </Card>
      
    </main>
  );
}
