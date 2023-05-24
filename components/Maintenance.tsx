'use client';

import Image from 'next/image';

export default function Maintenance() {
  return (
    <div className="grid h-screen grid-cols-1 lg:grid-cols-5">
      <div className="flex items-center justify-center p-6 bg-white md:p-8 md:col-span-2">
        <div className="w-full lg:pb-24">
          <header className="mb-6">
            <div className="mb-8 md:mb-16 lg:mb-20">
              <Image
                src="/logo.png"
                alt="Allocations.com"
                width={200}
                height={30}
                className="cursor-pointer"
              />
            </div>
            <h1 className="mb-6 text-2xl">Platform maintenance</h1>
            <p>
              We would like to inform you that our platform is under maintenance
              work.
            </p>
            <p>
              During this period, the dashboard and its related services is
              temporarily unavailable.
            </p>
            <p>
              We appreciate your patience and understanding during this time.
              Our team is working hard to minimize the downtime and we aim to
              get everything back up and running as quickly as possible.
            </p>
            <p>
              If you have any questions or concerns, please feel free to reach
              out to our customer support at support@allocations.com Thank you
              for your continued support.
            </p>
          </header>
        </div>
      </div>
      <div className="p-6 text-white md:col-span-3 bg-primary-500 md:p-8 lg:p-12 bg-1">
        {/* <div style={{ maxWidth: 400 }}>
          <h2
            className="mb-4 text-xl md:text-2xl lg:text-4xl"
            style={{ lineHeight: 1.25 }}
          >
            Discover What's New in Allocations 2.0
          </h2>
          <p className="text-base text-white lg:text-lg">
            With Allocations v2.0, users can expect a more stable platform and
            intuitive experience.
          </p>
        </div> */}
      </div>
    </div>
  );
}
