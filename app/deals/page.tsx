'use client';
import { Button, Card, Flex, List, ListItem, Text, TextInput, Title } from '@tremor/react';
import Search from '@/components/search';
import CustomTable from '@/components/taxes';
import Table from '@/components/tables/Table';
import { CalendarDaysIcon, CreditCardIcon, UserCircleIcon } from '@heroicons/react/20/solid'
import SPVDealPage from '@/app/spvs/spv-manage-deal-page';
import { Client } from '@planetscale/database';
import CardInvestInfo from './card-invest-info';
import CardConfidential from './card-confidential';
import { EyeIcon } from '@heroicons/react/24/outline';

// Deal Page: This is the deal page that the investors see when they are investing in a deal - kadvani
    // Todo: Build this out to look like the examples below
    // Note: This is the investor view of SPVDealPage (no admin rights)


export const dynamic = 'force-dynamic';

const coInvestors = [
  {
    id: '1',
    title: 'Mountain View',
    text: 'GV providers venture capital funding to bold new companies',
    capital: '$5M'
  },
  {
    id: '2',
    title: 'CooperSurgical',
    text: '',
    capital: '$3M'
  },
  {
    id: '3',
    title: 'US Fertility',
    text: '',
    capital: '$1M'
  }
]

export default async function IndexPage({}: {}) {
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl"> 
      <Title>Invest </Title>

      <Card className="mt-6">
        <SPVDealPage />
      </Card>

      <Card className='mt-6 '>
        <CardConfidential />
        <Flex className='relative'>
          <div className='flex flex-col self-start w-3/4 mr-20'>
            <header className='flex mb-5'>
              <img src='#' alt='logo' className='w-16 h-16 border'/>
              <div className='ml-8'>
                <Title>Granata Bio</Title>
                <Text>Invited by Mana Ventures</Text>
              </div>
            </header>
            
            <div>
              <Title className='my-5'>Deck</Title>
              <button className='w-full rounded-md bg-gray-200 px-2.5 py-1.5 text-xs font-semibold text-gray-900 hover:bg-gray-400'>Open Deck in New Deck</button>
              <div className='w-full h-96 border my-5 flex justify-center items-center'>
                <p>Loading...</p>
              </div>
            </div>

            <span className='w-full my-16 border-b b-gray-200' />

            <div>
              <Title>Memo</Title>
              <img src='#' alt='image' className='mt-5 w-full h-24 border' />
              <Text className='mb-5 font-semibold'>Backet by <a>Google ventures</a>, <a>Granata Bio</a> is a biopharma company developing therapeutics for fertility patients.</Text>
              <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis laudantium perspiciatis itaque cumque reprehenderit voluptate provident vel sunt inventore veritatis. Minus neque, ullam excepturi placeat veniam obcaecati esse necessitatibus praesentium! Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis eius voluptas, eveniet magni id eaque iusto! Aliquam, aliquid totam nulla officiis consequuntur saepe quod odit autem maxime animi ratione? Harum. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Excepturi assumenda est eaque placeat autem, laborum aspernatur corrupti, obcaecati vel voluptatibus sequi qui ipsam deleniti amet sint nesciunt? Vero, impedit nihil?</Text>

              <div className="relative" aria-hidden="true">
                <div className="absolute -inset-x-20 bottom-0 bg-gradient-to-t from-white pt-[7%]" />
              </div>
              <button className='inline-flex justify-center items-center w-full border-0 rounded-md bg-gray-200 px-2.5 py-1.5 text-xs font-semibold text-gray-900 hover:bg-gray-400'>
                <EyeIcon className="-ml-0.5 h-3 w-4 mr-1" aria-hidden="true"/>
                View the entire memo
              </button>
              {/* <details>
                <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis laudantium perspiciatis itaque cumque reprehenderit voluptate provident vel sunt inventore veritatis. Minus neque, ullam excepturi placeat veniam obcaecati esse necessitatibus praesentium! Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis eius voluptas, eveniet magni id eaque iusto! Aliquam, aliquid totam nulla officiis consequuntur saepe quod odit autem maxime animi ratione? Harum. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Excepturi assumenda est eaque placeat autem, laborum aspernatur corrupti, obcaecati vel voluptatibus sequi qui ipsam deleniti amet sint nesciunt? Vero, impedit nihil?</Text>
              </details> */}
            </div>

            <span className='w-full my-16 border-b b-gray-200' />

            <div>
              <Title className='mb-4'>Co-Investors</Title>
              {coInvestors.map((item) => (
                <div key={item.id} className='flex p-5 rounded-md border mb-4 border-gray-200'>
                  <img src='#' alt='#' className='w-12 h-12 border'/>
                  <div className='mx-5 w-1/2 self-center'>
                    <Title>{item.title}</Title>
                    <Text>{item.text}</Text>
                  </div>
                  <Text className='font-bold self-center'>{item.capital}</Text>
                </div>
              ))}
            </div>

            <span className='w-full my-16 border-b b-gray-200' />

            <div>
              <Title>Past Financing</Title>
              <Text className='font-semibold'>Note from Mana Ventures</Text>
              <Text>The company has raised $2.3M in capital to date.</Text>
              <Title className='mt-4 border-dotted border-b border-black'>Risks and Disclaimers</Title>
            </div>

          </div>

          <CardInvestInfo />
        </Flex>

      </Card>

      <Card className='mt-6 flex-col'>
        {/* <img src="https://i.ibb.co/j521bJt/Screenshot-2023-04-15-at-6-00-13-PM.png" alt="" /> */}
        {/* <img src="https://i.ibb.co/Jv9xSXb/Screenshot-2023-04-15-at-6-00-21-PM.png" alt="" /> */}
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
