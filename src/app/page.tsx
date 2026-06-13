'use client';

import dynamic from 'next/dynamic';

const Gallery3D = dynamic(() => import('@/components/Gallery3D'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen bg-black flex flex-col items-center justify-center">
      <div className="relative w-20 h-20 mb-6">
        <div className="absolute inset-0 border-4 border-amber-600/30 rounded-full" />
        <div className="absolute inset-0 border-4 border-transparent border-t-amber-500 rounded-full animate-spin" />
      </div>
      <h2 className="text-amber-100 text-xl font-serif mb-1">Loading Gallery...</h2>
      <p className="text-amber-200/50 text-xs">Preparing 3D environment</p>
    </div>
  ),
});

export default function Home() {
  return <Gallery3D />;
}
