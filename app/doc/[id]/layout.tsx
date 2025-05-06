import RoomProvider from '@/components/RoomProvider';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react';

type LayoutProps = {
  children: React.ReactNode;
  params: { id: string };
};

export default async function DocLayout({ children, params }: LayoutProps) {
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
//   params,
// }: {
//   children: React.ReactNode;
//   params: {
//     id: string;
//   };
// }) {
//   // Await params to ensure they're available
//   const { id } = await params;  // Destructure `id` after awaiting params
//   const { userId } = await auth();

//   if (!userId) {
//     redirect('/sign-in'); // Redirect if not authenticated
//   }

//   return <RoomProvider roomId={id}>{children}</RoomProvider>;
// }

// export default DocLayout;


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
