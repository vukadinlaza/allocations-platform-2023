import { CheckIcon, PlusIcon } from "@heroicons/react/24/outline";
import { Text, Title } from "@tremor/react";
import { useState } from "react";

export default function CardInvestDeal() {
    const [check, setCheck] = useState(false);

    function handleCheck() {
        setCheck(!check)
    }

    return (
        <div className='flex flex-col self-start w-3/4 mr-20'>
            <Title className='text-2xl'>Complete your investment</Title>
            <Title className='mt-5'>How much would you like to invest?</Title>
            <Text className="mb-2">USD $2,000 minimum required</Text>
            <div className="relative mt-2 flex items-center">
                <div className="absolute inset-y-0 left-0 flex p-1">
                    <span className="inline-flex items-center rounded border bg-gray-200 p-1 text-xs text-gray-900 hover:cursor-pointer">
                    USD ($)
                    </span>
                </div>
                <input
                    type="text"
                    placeholder='2,500.0'
                    className="block w-1/3 rounded-md border-0 py-1.5 pl-16 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
            </div>

            <Title className='text-2xl mt-8'>Who is investing?</Title>
            <div onClick={handleCheck} className="flex justify-between items-center my-5 border rounded-md border-gray-200 p-4 hover:cursor-pointer">
                <div>
                    <Title>Kingsley A <span className="text-xs rounded-sm p-1 bg-orange-100 text-orange-950">Missing information</span></Title>
                    <Text>Individual - 0 Investments - Qualified Purchaser</Text>
                </div>
                <div className="h-5 w-5 rounded-full border border-gray-400 items-center">
                    {check && <CheckIcon className="w-full h-full" stroke="#9ca3af"/>}
                </div>
            </div>
            <div className="flex items-center hover:cursor-pointer">
                <PlusIcon className="w-5 h-5" stroke="#2563eb"/>
                <Title className="ml-1 text-blue-600">New Investment Entity</Title>
            </div>
        </div>
    )
}
