'use client';

import dynamic from 'next/dynamic';

const BirthdayExperience = dynamic(
  () => import('@/components/BirthdayExperience'),
  { ssr: false }
);

export default function Home() {
  return <BirthdayExperience />;
}
