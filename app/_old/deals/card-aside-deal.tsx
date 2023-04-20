import { ExclamationCircleIcon } from "@heroicons/react/24/outline"
import { Card, List, ListItem, Text, Title } from "@tremor/react"

const cardInfos = [
    {
      title: 'Commitment',
      info: '$2,500.00'
    },
    {
      title: 'Funding method',
      info: 'None selected'
    },
    {
      title: 'Due today',
      info: '$2,500.00'
    },
  ]

export default function CardAsideDeal() {
    return (
        <Card className='w-1/3 self-start sticky top-8'>
          <header>
            <img src="#" alt="logo" className=""/>
            <Title>Granata Bio</Title>
          </header>

          <div className="my-2">
            <Title className='text-xs'>Series A - $24M valuation</Title>
            <Title className='text-xs'>20% Lead Carry - 4% Estimated Fee <ExclamationCircleIcon className="inline ml-1 w-4 h-4 align-top hover:cursor-pointer"/> </Title>
          </div>

          <Text className="my-2">Invited by Mana Ventures</Text>

          <List>
            {cardInfos.map((item) => (
                <ListItem key={item.title}>
                    <Title className='text-xs'>{item.title}</Title>
                    <Text className='text-xs'>{item.info}</Text>
                </ListItem>
            ))}
          </List>
        </Card>
    )
}
