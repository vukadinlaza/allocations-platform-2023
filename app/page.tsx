'use client';
import { Card, Flex, Grid, Metric, Text } from '@tremor/react';
import OrganizationsDataCard from '../modules/dataCards/Organizations';
import Banner from '@/components/banner';
import Metrics from './page-metrics'


export default function IndexPage() {
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Banner />
      <Card className='mt-6'>
        <Metrics />  
      </Card>
      
    </main>
  );
}
