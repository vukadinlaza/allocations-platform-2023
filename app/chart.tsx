'use client';

import { Card, AreaChart, Title, Text } from '@tremor/react';

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
      <Title>Portfolio Value</Title>
      <Text>Growth in portfolio over time</Text>
      <AreaChart
        className="mt-4 h-80"
        data={data}
        categories={['Investment', 'Valuation']}
        index="Month"
        colors={['indigo', 'fuchsia']}
        valueFormatter={valueFormatter}
      />
    </Card>
  );
}