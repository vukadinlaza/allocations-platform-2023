const stats = [
  
  // Total Assets: calculated as the sum of all the Fund / Investors assets on the platform - kadvani
  { name: 'Total Assets', value: '$6,440,000', change: '+4.75%', changeType: 'positive' },
  
  // Total Invested: Calculated as the total dollar amount invested into assets - kadvani
  { name: 'Total Invested', value: '$1,750,000', change: '+54.02%', changeType: 'negative' },

  // Estimated Multiple: The estimated valuation increase of the assets on the platform (submitted by the fund manager) - kadvani
  { name: 'Estimated Multiple', value: '3.68x', change: '-1.39%', changeType: 'positive' },

  // Total Investors (Fund Manager only): The total investors associated with the fund manager - kadvani
  { name: 'Total Investors', value: '1,097', change: '+10.18%', changeType: 'negative' },

  // Todo: Replace Total Investors with Total Investments for Investor user type - kadvani
  // Total Investments (Investor only): The total investments associated with the investor - kadvani
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  return (
    <dl className="mx-auto grid grid-cols-1 gap-px bg-gray-900/5 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.name}
          className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 bg-white px-4 py-10 sm:px-6 xl:px-8"
        >
          <dt className="text-sm font-medium leading-6 text-gray-500">{stat.name}</dt>
          <dd
            className={classNames(
              stat.changeType === 'negative' ? 'text-rose-600' : 'text-gray-700',
              'text-xs font-medium'
            )}
          >
            {stat.change}
          </dd>
          <dd className="w-full flex-none text-3xl font-medium leading-10 tracking-tight text-gray-900">
            {stat.value}
          </dd>
        </div>
      ))}
    </dl>
  )
}
