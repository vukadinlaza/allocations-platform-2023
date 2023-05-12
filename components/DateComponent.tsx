'use client';

import dayjs from 'dayjs';

export default function Date({ date }: { date: any }) {
  return (
    <>
      <span>{dayjs(date).format('MM/DD/YYYY')}</span>
    </>
  );
}
