import { Text, Title } from "@tremor/react";
import { EyeIcon } from '@heroicons/react/24/outline';

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

export default function CardInvestInfo() {
    return (
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
                <Title className='mt-4 border-dotted border-b border-black w-fit'>Risks and Disclaimers</Title>
                <div className='mt-4 space-y-6'>
                    <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum asperiores dolorem aut deserunt reprehenderit minima distinctio, dicta error tempora rerum voluptatibus unde repellendus maxime architecto dignissimos aliquam possimus numquam quisquam!</Text>
                    <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, labore! Nesciunt praesentium quidem ipsam molestias quia non porro provident quo sed eveniet temporibus, blanditiis nobis nam! Eligendi quae dicta inventore?</Text>
                </div>
                <Title className='mt-4'>Note from Mana Ventures</Title>
                <div className='mt-4 space-y-6'>
                    <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum asperiores dolorem aut deserunt reprehenderit minima distinctio, dicta error tempora rerum voluptatibus unde repellendus maxime architecto dignissimos aliquam possimus numquam quisquam!</Text>
                    <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, labore! Nesciunt praesentium quidem ipsam molestias quia non porro provident quo sed eveniet temporibus, blanditiis nobis nam! Eligendi quae dicta inventore?</Text>
                </div>
                <Title className='mt-4'>Note from AngelList</Title>
                <div className='mt-4 space-y-6'>
                    <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum asperiores dolorem aut deserunt reprehenderit minima distinctio, dicta error tempora rerum voluptatibus unde repellendus maxime architecto dignissimos aliquam possimus numquam quisquam!</Text>
                    <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, labore! Nesciunt praesentium quidem ipsam molestias quia non porro provident quo sed eveniet temporibus, blanditiis nobis nam! Eligendi quae dicta inventore?</Text>
                    <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, labore! Nesciunt praesentium quidem ipsam molestias quia non porro provident quo sed eveniet temporibus, blanditiis nobis nam! Eligendi quae dicta inventore?</Text>
                </div>

                <div className='rounded-md border border-gray-200 mt-10 p-5'>
                    <Title className='mb-4'>Need more information to make your investment decision?</Title>
                    <button className='w-fit border-0 rounded-md bg-gray-200 px-2.5 py-2.5 text-xs font-semibold text-gray-900 hover:bg-gray-400'>
                    Message Syndicate
                    </button>
                </div>
            </div>

        </div>

    )
}