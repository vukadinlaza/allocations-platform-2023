'use client';
import { Card, Divider, Flex, Grid, Metric, Text } from '@tremor/react';
import OrganizationsDataCard from '../modules/dataCards/Organizations';
import Banner from '@/components/banner';

const dataFormatter = (number: number) =>
  Intl.NumberFormat('us').format(number).toString();

const categories: {
  title: string;
  metric: string;
}[] = [
  {
    stage: 'Total Raised',
    metric: '$ 14.8m'
  },
  {
    stage: 'Estimated Multiple',
    metric: '2.7x'
  },
  {
    stage: 'Total Private Funds',
    metric: '69'
  },
  {
    stage: 'Total Investors',
    metric: '1257'
  }
];

export default function IndexPage() {
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Banner />
      <Grid className="gap-6" numColsSm={2} numColsLg={3}>
        <OrganizationsDataCard />
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
          <Card key={item.stage}>
            <Flex alignItems="start">
              <Text>{item.stage}</Text>
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
    </main>
  );
}
