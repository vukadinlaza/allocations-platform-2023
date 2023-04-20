const stats = [
    { name: 'Portfolio Value', value: '$6,440,000', change: '+4.75%', changeType: 'positive' },
    { name: 'Total Invested', value: '$1,750,000', change: '+54.02%', changeType: 'negative' },
    { name: 'Estimated Multiple', value: '3.68x', change: '-1.39%', changeType: 'positive' },
    { name: 'Total Investments', value: '107', change: '+10.18%', changeType: 'negative' },
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
  