import { Card, Title } from '@tremor/react';
import Search from '@/components/search';
import CustomTable from '@/components/taxes';
import Table from '@/components/tables/Table';
import { CalendarDaysIcon, CreditCardIcon, UserCircleIcon } from '@heroicons/react/20/solid'


export const dynamic = 'force-dynamic';

export default async function IndexPage({}: {}) {
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl"> 
      <Title>Invest </Title>
      <Card className='mt-6'>
        <img src="https://i.ibb.co/j521bJt/Screenshot-2023-04-15-at-6-00-13-PM.png" alt="" />
        <img src="https://i.ibb.co/Jv9xSXb/Screenshot-2023-04-15-at-6-00-21-PM.png" alt="" />
        <img src="https://i.ibb.co/59gNhJ5/Screenshot-2023-04-15-at-6-00-26-PM.png" alt="" />
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
