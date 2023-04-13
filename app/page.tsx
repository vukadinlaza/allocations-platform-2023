"use client";
import { Card, Metric, Text, Flex, Grid, Title, BarList } from '@tremor/react';
import Chart from './chart';
import { supabase } from '../lib/supabase';
import { useCallback, useEffect, useState } from 'react';

//
const website = [
  { name: '/home', value: 1230 },
  { name: '/contact', value: 751 },
  { name: '/gallery', value: 471 },
  { name: '/august-discount-offer', value: 280 },
  { name: '/case-studies', value: 78 }
];

const shop = [
  { name: '/home', value: 453 },
  { name: '/imprint', value: 351 },
  { name: '/shop', value: 271 },
  { name: '/pricing', value: 191 }
];

const app = [
  { name: '/shop', value: 789 },
  { name: '/product-features', value: 676 },
  { name: '/about', value: 564 },
  { name: '/login', value: 234 },
  { name: '/downloads', value: 191 }
];

const data = [
  {
    category: 'Website',
    stat: '10,234',
    data: website
  },
  {
    category: 'Online Shop',
    stat: '12,543',
    data: shop
  },
  {
    category: 'Mobile App',
    stat: '2,543',
    data: app
  }
];

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
              <Text className="truncate"> {item.metricPrev}</Text>
            </Flex>
          </Card>
        ))}
      </Grid>
      {/* <Grid className="mt-8 gap-6" numColsSm={2} numColsLg={3}>
        {data.map((item) => (
          <Card key={item.category}>
            <Title>{item.category}</Title>
            <Flex
              className="space-x-2"
              justifyContent="start"
              alignItems="baseline"
            >
              <Metric>{item.stat}</Metric>
              <Text>Total views</Text>
            </Flex>
            <Flex className="mt-6">
              <Text>Pages</Text>
              <Text className="text-right">Views</Text>
            </Flex>
            <BarList
              className="mt-2"
              data={item.data}
              valueFormatter={dataFormatter}
            />
          </Card>
        ))}
      </Grid> */}
      <Chart />
    </main>
  );
}
