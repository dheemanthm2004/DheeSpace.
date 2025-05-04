import RoomProvider from '@/components/RoomProvider';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React, { ReactNode } from 'react';

// Fix: Use the correct layout props typing
interface DocLayoutProps {
  children: ReactNode;
  params: {
    id: string;
  };
}

export default async function DocLayout({ children, params }: DocLayoutProps) {
  const { id } = params;
  const { userId } = await auth();

  if (!userId) {
    redirect('/sign-in');
  }

  return <RoomProvider roomId={id}>{children}</RoomProvider>;
}




// import RoomProvider from '@/components/RoomProvider';
// import { auth } from '@clerk/nextjs/server';
// import { redirect } from 'next/navigation';
// import React from 'react';

// async function DocLayout({
//   children,
//   params: { id },
// }: {
//   children: React.ReactNode;
//   params: {
//     id: string;
//   };
// }) {
//   const { userId } = await auth();

//   if (!userId) {
//     redirect('/sign-in'); // or throw an error if preferred
//   }

//   return <RoomProvider roomId={id}>{children}</RoomProvider>;
// }

// export default DocLayout;
