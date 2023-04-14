import { FC, ReactNode } from 'react';
import { Card, Flex, Metric, Text } from '@tremor/react';

const DataCard: FC<{
  title: string;
  metric: ReactNode;
}> = ({
  title,
  metric
})=>{
  return (
    <Card>
      <Flex alignItems="start">
        <Text>{title}</Text>
      </Flex>
      <Flex
        className="space-x-3 truncate"
        justifyContent="start"
        alignItems="baseline"
      >
        <Metric>{metric}</Metric>
      </Flex>
    </Card>
  );
}

export default DataCard;
