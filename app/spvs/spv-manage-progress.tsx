export default function Example() {
  return (
    <div>
      <h4 className="sr-only">Status</h4>
      <p className="text-sm font-medium text-gray-900">$100k raised...</p>
      <div className="mt-6" aria-hidden="true">
        <div className="overflow-hidden rounded-full bg-gray-200">
          <div className="h-2 rounded-full bg-indigo-600" style={{ width: '37.5%' }} />
        </div>
        <div className="mt-6 hidden grid-cols-4 text-sm font-medium text-gray-600 sm:grid">
          <div className="text-indigo-600">Start</div>
          <div className="text-center text-indigo-600"></div>
          <div className="text-center"></div>
          <div className="text-right">Complete</div>
        </div>
      </div>
    </div>
  )
}
