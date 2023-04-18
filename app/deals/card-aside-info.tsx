import { Card, List, ListItem, Text, Title } from '@tremor/react';

const cardInfos = [
    {
      title: 'Round',
      info: 'Series A'
    },
    {
      title: 'Raising as equity',
      info: '$12M'
    },
    {
      title: 'Share Class',
      info: 'Preferred'
    },
    {
      title: 'Pre-Money Valuation',
      info: '$24M'
    },
    {
      title: 'Pro Rata Rights',
      info: 'Included'
    },
    {
      title: 'Allocation',
      info: '$200k'
    },
    {
      title: 'Estimated Fees',
      info: '4%'
    },
    {
      title: 'Syndicate Lead`s Investment',
      info: '$15.000'
    },
    {
      title: 'Carry to Lead',
      info: '20%'
    },
    {
      title: 'Min. Investment',
      info: '$2.000'
    },
  ]

export default function CardAsideInfo() {
    return (
        <Card className='w-1/3 self-start sticky top-8'>
          <header>
            <Title>Invest</Title>
            <Text>Minimum is $2,000 - invest by Apr 17</Text>
          </header>
          <div className="relative mt-2 flex items-center">
            <div className="absolute inset-y-0 left-0 flex p-1">
                <span className="inline-flex items-center rounded border bg-gray-200 p-1 text-xs text-gray-900 hover:cursor-pointer">
                USD ($)
                </span>
            </div>
            <input
                type="text"
                placeholder='2,500.0'
                className="block w-full rounded-md border-0 py-1.5 pl-16 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div className='mt-2 flex'>
            <button
              type="button"
              className="w-3/6 rounded-md bg-gray-900 px-2.5 py-1.5 text-xs font-semibold text-white hover:bg-gray-400 mr-2"
            >
              Invest
            </button>
            <button
              type="button"
              className="w-3/6 rounded-md bg-gray-200 px-2.5 py-1.5 text-xs font-semibold text-gray-900 hover:bg-gray-400"
            >
              Pass
            </button>
          </div>
          <List>
            {cardInfos.map((item) => (
                <ListItem key={item.title}>
                <Title className='text-xs'>{item.title}</Title>
                <Text className='text-xs'>{item.info}</Text>
                </ListItem>
            ))}
          </List>
          <Text className='text-xs mt-1'>View Closing Docs</Text>
        </Card>
    )
}