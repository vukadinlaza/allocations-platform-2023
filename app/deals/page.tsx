import { Button, Card, Flex, List, ListItem, Text, TextInput, Title } from '@tremor/react';
import Search from '@/components/search';
import CustomTable from '@/components/taxes';
import Table from '@/components/tables/Table';
import { CalendarDaysIcon, CreditCardIcon, UserCircleIcon } from '@heroicons/react/20/solid'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';


export const dynamic = 'force-dynamic';

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

export default async function IndexPage({}: {}) {
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl"> 
      <Title>Invest </Title>

      <Card className='mt-6 flex'>
        {/* <img src="https://i.ibb.co/j521bJt/Screenshot-2023-04-15-at-6-00-13-PM.png" alt="" />
        <img src="https://i.ibb.co/Jv9xSXb/Screenshot-2023-04-15-at-6-00-21-PM.png" alt="" />
        <img src="https://i.ibb.co/59gNhJ5/Screenshot-2023-04-15-at-6-00-26-PM.png" alt="" /> */}

        <Card className='flex h-fit bg-orange-100 border-0'>
          <ExclamationTriangleIcon className="h-5 w-4 text-orange-900" aria-hidden="true" />
          <Text className='text-orange-900 ml-1'><strong>Confidential: </strong>Contacting founders or sharing information will result in removal from AngelList. This page contains unique identifiers and logs attempts to capture and share information.</Text>
        </Card>
        
        <Card className='w-1/4'>
          <header>
            <Title>Invest</Title>
            <Text>Minimum is $2,000 - invest by Apr 17</Text>
          </header>
          <div className="relative mt-2 flex items-center">
            <div className="absolute inset-y-0 left-0 flex py-1.5 pr-1.5">
              <span className="inline-flex items-center rounded border bg-gray-200 px-1 text-xs text-gray-900">
                USD ($)
              </span>
            </div>
            <input
              type="text"
              placeholder='2,500.0'
              className="block w-full rounded-md border-0 py-1.5 pl-14 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div>
            <button
              type="button"
              className="rounded bg-white/10 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-white/20"
            >
              Invest
            </button>
            <button
              type="button"
              className="rounded bg-white/10 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-white/20"
            >
              Pass
            </button>
          </div>
          <List>
            {cardInfos.map((item) => (
              <ListItem key={item.title}>
                <Title>{item.title}</Title>
                <Text>{item.info}</Text>
              </ListItem>
            ))}
          </List>
          <Text>View Closing Docs</Text>
        </Card>



      </Card>

      <Card className="mt-6">
        Invest
        <img src="https://i.ibb.co/QnTxsmL/Screenshot-2023-04-15-at-5-56-53-PM.png" alt="" />
        <img src="https://i.ibb.co/fSCPsj1/Screenshot-2023-04-15-at-5-59-07-PM.png" alt="" />
      </Card>

      <Card className="mt-6" style={{ float: 'right' }}>
      <div className="lg:col-start-3 lg:row-end-1">
      <h2 className="sr-only">Summary</h2>
      <div className="rounded-lg bg-gray-50 shadow-sm ring-1 ring-gray-900/5">
        <dl className="flex flex-wrap">
          <div className="flex-auto pl-6 pt-6">
            <dt className="text-sm font-semibold leading-6 text-gray-900">Amount</dt>
            <dd className="mt-1 text-base font-semibold leading-6 text-gray-900">$10,560.00</dd>
          </div>
          <div className="flex-none self-end px-6 pt-4">
            <dt className="sr-only">Status</dt>
            <dd className="rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-600 ring-1 ring-inset ring-green-600/20">
              Paid
            </dd>
          </div>
          <div className="mt-6 flex w-full flex-none gap-x-4 border-t border-gray-900/5 px-6 pt-6">
            <dt className="flex-none">
              <span className="sr-only">Client</span>
              <UserCircleIcon className="h-6 w-5 text-gray-400" aria-hidden="true" />
            </dt>
            <dd className="text-sm font-medium leading-6 text-gray-900">Alex Curren</dd>
          </div>
          <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
            <dt className="flex-none">
              <span className="sr-only">Due date</span>
              <CalendarDaysIcon className="h-6 w-5 text-gray-400" aria-hidden="true" />
            </dt>
            <dd className="text-sm leading-6 text-gray-500">
              <time dateTime="2023-01-31">January 31, 2023</time>
            </dd>
          </div>
          <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
            <dt className="flex-none">
              <span className="sr-only">Status</span>
              <CreditCardIcon className="h-6 w-5 text-gray-400" aria-hidden="true" />
            </dt>
            <dd className="text-sm leading-6 text-gray-500">Paid with MasterCard</dd>
          </div>
        </dl>
        <div className="mt-6 border-t border-gray-900/5 px-6 py-6">
          <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
            Download receipt <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </div>
      </Card>
    </main>
  );
}
