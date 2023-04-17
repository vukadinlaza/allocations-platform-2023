import { Button, Card, Flex, List, ListItem, Text, Title } from '@tremor/react';
import Search from '../../components/search';

export const dynamic = 'force-dynamic';

const users = [
  {
    id: '1',
    nameFrom: 'Tester',
    nameTo: 'John',
    message: 'Hi there',
    date: 'Apr 8'
  },
  {
    id: '2',
    nameFrom: 'Herbert',
    nameTo: 'John',
    message: 'New group',
    date: 'Apr 6'
  },
  {
    id: '3',
    nameFrom: 'Herbert',
    nameTo: 'John',
    message: 'Test',
    date: 'Apr 6'
  },
  {
    id: '4',
    nameFrom: 'Herbert Hoover',
    nameTo: '',
    message: 'Hi guys!',
    date: 'Apr 6'
  },
];

export default async function IndexPage({}: {}) {
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">

      <Flex>

        <Card className="mr-4 w-1/3">            
          <Title>Inbox</Title>
          <Text></Text>
          <span className='flex w-full border-b-2 border-green-800'></span>
          <Search />
          <div>
            <div className='title'>
              <Text>Showing 7 conversations.</Text>
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
                </svg>
              </div>

            </div>

            <div>
              <h6>Selected Deals (1)</h6>
              {/* <Button size="sm" onClick={() => console.log('f')}>Reset</Button> */}
            </div>

            <div>
              <img src='#' alt='avatar'/>
              <Text>78-Acre Commercial & Residential Land...</Text>
              {/* <Button size="sm">x</Button> */}
            </div>

            <div className='border-1 rounded-lg'>
              <div>
                <h6>Filters</h6>
                {/* <Button size="sm">Reset</Button> */}
              </div>
              <div>
                <div>
                  <div>icon-arrow</div>
                  <Text>Slightly interested</Text>
                  {/* <Button size="sm">x</Button> */}
                </div>
                <div>
                  <div>icon-arrow</div>
                  <Text>Moderately interested</Text>
                  {/* <Button size="sm">x</Button> */}
                </div>
                <div>
                  <div>icon-arrow</div>
                  <Text>Slightly interested</Text>
                  {/* <Button size="sm">x</Button> */}
                </div>
              </div>
            </div>

          </div>

          <List>
            {users.map((item) => (
              <ListItem key={item.id}>
                <div>
                  <img src="#" alt="ava" />
                </div>
                <div>
                  <Text>{`${item.nameFrom}, ${item.nameTo}`}</Text>
                  <Text>{`${item.nameFrom}: ${item.message}`}</Text>
                </div>
                <Text>{item.date}</Text>
              </ListItem>
            ))}
          </List>
        </Card>

        <Card className="w-2/3">
          <head>
            <Title>Herbert, John and you</Title>
            <div>
              <div>

              </div>
              <span>
                icon
              </span>
            </div>
            <span className='flex w-full border-b-2 border-green-800'/>
          </head>

          <section className="pt-3 pb-11 flex flex-1 inboxHeight">
            <div className="flex-1 max-w-7xl mx-auto lg:px-8 md:px-6 px-[14px]">
              <div className="h-full flex gap-4">

              </div>
            </div>
          </section>
        </Card> 

      </Flex>


      {/* <Card className="mt-6">
        <img src="https://i.ibb.co/VQtPptw/Screenshot-2023-04-15-at-11-46-31-AM.png" alt="" />
      </Card> */}
    </main>
  );
}
