'use client';

import dynamic from 'next/dynamic';
import React from 'react';

const VirtualTryOn = dynamic(
  () => import('@/components/VirtualTryOn'),
  { ssr: false, loading: () => <div>Loading...</div> }
);

export default function VirtualTryOnClient() {
  return <VirtualTryOn />;
}
