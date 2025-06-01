import RoomProvider from '@/components/RoomProvider';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react';

interface DocLayoutProps {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}

async function DocLayout({ children, params }: DocLayoutProps) {
  const { id } = await params;
  const { userId } = await auth();

  if (!userId) {
    redirect('/sign-in');
  }

  return <RoomProvider roomId={id}>{children}</RoomProvider>;
}

export default DocLayout;
