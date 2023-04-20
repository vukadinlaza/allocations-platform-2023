'use client';

import { Card, AreaChart, Title, Text } from '@tremor/react';

// Metrics: The total value of all assets associated with user on the platform over time
// Note: Please switch this to only one line (Total assets) and remove the other two lines 

const data = [
  {
    Month: 'Jan 21',
    Investment: 1000000,
    Valuation: 1000000
  },
  {
    Month: 'Feb 21',
    Investment: 2000000,
    Valuation: 2000000
  },
  {
    Month: 'Jan 22',
    Investment: 3000000,
    Valuation: 3000000
  }
];

const valueFormatter = (number: number) =>
  `$ ${Intl.NumberFormat('us').format(number).toString()}`;

export default function Chart() {
  return (
    <Card className="mt-8">
      <Title>Total assets</Title>
      <Text>Growth in assets over time</Text>
      <AreaChart
        className="mt-4 h-80"
        data={data}
        categories={['Investment', 'Valuation']}
        index="Month"
        colors={['emerald', 'emerald']}
        valueFormatter={valueFormatter}
      />
    </Card>
  );
}