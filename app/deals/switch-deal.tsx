import { useState } from 'react'
import { Switch } from '@headlessui/react'
import { BuildingLibraryIcon, CreditCardIcon } from '@heroicons/react/24/outline'
import { Title } from '@tremor/react'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function SwitchDeal() {
  const [enabled, setEnabled] = useState(false)

  return (
    <Switch
      checked={enabled}
      onChange={setEnabled}
      className='bg-gray-200 relative inline-flex h-9 w-full flex-shrink-0 cursor-pointer rounded-md border-transparent transition-colors duration-200 ease-in-out'
    >

      <span
          className={classNames(
            enabled ? 'opacity-30 duration-100 ease-out' : 'opacity-0 duration-200 ease-in',
            'absolute flex h-full w-1/2 left-0 items-center justify-center transition-opacity'
          )}
          aria-hidden="true"
        >
            <BuildingLibraryIcon className="h-5 w-5"/>
            <Title className='text-sm ml-1'>Bank</Title>
        </span>
        <span
          className={classNames(
            enabled ? 'opacity-0 duration-200 ease-in' : 'opacity-30 duration-100 ease-out',
            'absolute flex h-full w-1/2 right-0 items-center justify-center transition-opacity'
          )}
          aria-hidden="true"
        >
            <CreditCardIcon className="h-5 w-5"/>
            <Title className='text-sm ml-1'>Wire</Title>
        </span>

      <span
        className={classNames(
          enabled ? 'translate-x-full' : 'translate-x-0',
          'pointer-events-none relative inline-block h-9 w-1/2 transform rounded-md border bg-white shadow ring-0 transition duration-200 ease-in-out'
        )}
      >
        <span
          className={classNames(
            enabled ? 'opacity-0 duration-100 ease-out' : 'opacity-100 duration-200 ease-in',
            'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity'
          )}
          aria-hidden="true"
        >
            <BuildingLibraryIcon className="h-5 w-5"/>
            <Title className='text-sm ml-1'>Bank</Title>
        </span>
        <span
          className={classNames(
            enabled ? 'opacity-100 duration-200 ease-in' : 'opacity-0 duration-100 ease-out',
            'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity'
          )}
          aria-hidden="true"
        >
            <CreditCardIcon className="h-5 w-5"/>
            <Title className='text-sm ml-1'>Wire</Title>
        </span>
      </span>
    </Switch>
  )
}