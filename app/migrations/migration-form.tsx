import { PaperClipIcon } from '@heroicons/react/20/solid'

export default function Example() {
  return (
    <>
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">Allocations - Atomizer 49 SPV</h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Edit migration</p>
      </div>
      
      {/* // SPV Legal Name  */}
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Entity Legal Name</dt>
            
            <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              
              <span className="flex-grow"><div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      name="website"
                      id="website"
                      value="Allocations - Atomizer 49 SPV"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Allocations - Atomizer 49 SPV"
                    />
                  </div>
                </div>
              </span>
              <span className="ml-4 flex-shrink-0">
                <button type="button" className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500">
                  Update
                </button>
              </span>
            </dd>
          </div>

          {/* // Manager Name  */}    
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Manager Name</dt>
            <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            <span className="flex-grow"><div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      name="website"
                      id="website"
                      value="Sharding Holdings Management LLC"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Sharding Holdings Management LLC"
                    />
                  </div>
                </div>
              </span>              
              <span className="ml-4 flex-shrink-0">
                <button type="button" className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500">
                  Update
                </button>
              </span>
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Company</dt>
            <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            <span className="flex-grow"><div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      name="website"
                      id="website"
                      value="SpaceX"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="SpaceX"
                    />
                  </div>
                </div>
              </span>              <span className="ml-4 flex-shrink-0">
                <button type="button" className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500">
                  Update
                </button>
              </span>
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">EIN</dt>
            <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            <span className="flex-grow"><div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      name="website"
                      id="website"
                      value="85-278236"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="85-278236"
                    />
                  </div>
                </div>
              </span>              
              <span className="ml-4 flex-shrink-0">
                <button type="button" className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500">
                  Update
                </button>
              </span>
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">First Close Date</dt>
            <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            <span className="flex-grow">
              <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      name="website"
                      id="website"
                      value="9 Feb 2023"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="9 Feb 2023"
                    />
                  </div>
                </div>
              </span>                          
              <span className="ml-4 flex-shrink-0">
                <button type="button" className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500">
                  Update
                </button>
              </span>
            </dd>
          </div>


          {/* // Documents */}
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Documents</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            <button type="button" className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500">Upload new </button>
              <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
                <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                  <div className="flex w-0 flex-1 items-center">
                    <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                    <div className="ml-4 flex min-w-0 flex-1 gap-2">
                      <span className="truncate font-medium">W8/W9</span>
                      <span className="flex-shrink-0 text-gray-400">2.4mb</span>
                    </div>
                  </div>
                  <div className="ml-4 flex flex-shrink-0 space-x-4">
                    <button
                      type="button"
                      className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Update
                    </button>
                    <span className="text-gray-200" aria-hidden="true">
                      |
                    </span>
                    <button type="button" className="rounded-md bg-white font-medium text-gray-900 hover:text-gray-800">
                      Remove
                    </button>
                  </div>
                </li>
                <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                  <div className="flex w-0 flex-1 items-center">
                    <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                    <div className="ml-4 flex min-w-0 flex-1 gap-2">
                      <span className="truncate font-medium">1065</span>
                      <span className="flex-shrink-0 text-gray-400">4.5mb</span>
                    </div>
                  </div>
                  <div className="ml-4 flex flex-shrink-0 space-x-4">
                    <button
                      type="button"
                      className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Update
                    </button>
                    <span className="text-gray-200" aria-hidden="true">
                      |
                    </span>
                    <button type="button" className="rounded-md bg-white font-medium text-gray-900 hover:text-gray-800">
                      Remove
                    </button>
                  </div>
                </li>
              </ul>
            </dd>
          </div>

          
          {/* // Investments */}
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Investments</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            <button type="button" className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500">Create new </button>
              <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
              <span className="flex-grow">
                      <img src="https://i.ibb.co/vdLxnc3/Screenshot-2023-04-15-at-4-22-09-PM.png" alt="" />
                    </span>
                <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                  <div className="flex w-0 flex-1 items-center">
                    <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                    <div className="ml-4 flex min-w-0 flex-1 gap-2">
                      <span className="truncate font-medium">Kingsley A</span>
                      <span className="flex-shrink-0 text-gray-400">$250,000</span>
                    </div>
                  </div>
                  <div className="ml-4 flex flex-shrink-0 space-x-4">
                    <button type="button" className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500">Update </button>
                    <span className="text-gray-200" aria-hidden="true">
                      |
                    </span>
                    <button type="button" className="rounded-md bg-white font-medium text-gray-900 hover:text-gray-800">
                      Remove
                    </button>
                  </div>
                </li>
                <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                  <div className="flex w-0 flex-1 items-center">
                    <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                    <div className="ml-4 flex min-w-0 flex-1 gap-2">
                      <span className="truncate font-medium">Brian F</span>
                      <span className="flex-shrink-0 text-gray-400">$1,000,000</span>
                    </div>
                  </div>
                  <div className="ml-4 flex flex-shrink-0 space-x-4">
                    <button
                      type="button"
                      className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Update
                    </button>
                    <span className="text-gray-200" aria-hidden="true">
                      |
                    </span>
                    <button type="button" className="rounded-md bg-white font-medium text-gray-900 hover:text-gray-800">
                      Remove
                    </button>
                  </div>
                </li>
              </ul>
            </dd>
          </div>
        </dl>
      </div>
    </>
  )
}
