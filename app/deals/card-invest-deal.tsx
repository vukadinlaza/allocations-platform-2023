import { ArrowDownTrayIcon, BuildingLibraryIcon, CheckIcon, DocumentIcon, PlusIcon } from "@heroicons/react/24/outline";
import { Button, Text, Title } from "@tremor/react";
import { useState } from "react";
import SwitchDeal from "./switch-deal";

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
                    className="block w-1/3 rounded-md border-0 py-1.5 pl-16 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-400 sm:text-sm sm:leading-6"
                />
            </div>

            <Title className='text-2xl mt-10'>Who is investing?</Title>

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

            <div>
                <Title className="text-2xl mt-10 mb-5">Choose a funding method</Title>
                <SwitchDeal/>
            </div>

            <div className="flex flex-col my-5 border rounded-md border-gray-200 p-4 hover:cursor-pointer">
                <div className="w-fit bg-gray-200 rounded-md p-2">
                    <BuildingLibraryIcon className="h-5 w-5"/>
                </div>

                <Title className="mt-4 mb-2">Connect your Bank <span className="rounded-sm bg-gray-100 p-1 text-sm text-blue-500">Recommended</span></Title>

                <Text>Convenient, No Fees, Transfers complete in 3-5 business days</Text>
            </div>

            <span className='w-full my-16 border-b b-gray-200' />

            <div>
                <Title>Review document and terms</Title>
                <div className="flex my-5 border rounded-md border-gray-200 p-4">
                    <div className="w-fit h-fit mr-5 bg-gray-200 rounded-md p-2">
                        <DocumentIcon className="h-5 w-5"/>
                    </div>

                    <div>
                        <Title className="text-sm">Draft closing documents</Title>
                        <Text className="text-xs">Finalized documents will be emailed when the deal has closed</Text>
                    </div>

                    <div className="w-fit h-fit ml-auto bg-gray-200 rounded-md p-2 hover:cursor-pointer">
                        <ArrowDownTrayIcon className="h-5 w-5"/>
                    </div>
                </div>
            </div>

            <div className="flex my-5">
                <div className="flex mr-4 h-6 items-center">
                    <input
                        id="comments"
                        aria-describedby="comments-description"
                        name="comments"
                        type="checkbox"
                        className="h-5 w-5 rounded border-gray-300 text-gray-400 focus:ring-gray-400"
                    />
                </div>
                <Title className="text-sm self-center">I have read the <span className="text-blue-600 hover:cursor-pointer">terms and provisions</span> and agree to e-sign the above documents.</Title>
            </div>

            <button className="h-9 w-full cursor-pointer rounded-md bg-gray-950 hover:bg-gray-600 text-white">Commit & E-Sign</button>

            <div className="my-10">
                <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam architecto blanditiis dolores nemo modi, molestiae doloremque incidunt laborum numquam quod soluta dignissimos alias natus culpa, labore ad repudiandae eveniet unde?</Text>
                <br/>
                <Text>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam obcaecati totam similique, adipisci reiciendis at harum nulla, pariatur ea, ducimus natus temporibus inventore accusamus assumenda qui impedit nihil. Aspernatur, blanditiis.</Text>
                <br/>
                <Text>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem, veniam tempora reprehenderit doloremque earum, perspiciatis tempore sequi quia iste culpa omnis consequatur aliquid accusantium, et rerum officiis eligendi esse saepe.</Text>
                <br/>
                <Text>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolore et eveniet, saepe consequuntur, autem veniam ut iste mollitia aperiam laborum accusamus molestiae vitae laboriosam. Vitae ipsa a alias eius ex.</Text>
                <br/>
                <Text>Please read in full the disclosures <span className="font-semibold underline hover:cursor-pointer">here</span>.</Text>
            </div>
        </div>
    )
}
