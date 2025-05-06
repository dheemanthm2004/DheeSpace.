import RoomProvider from '@/components/RoomProvider';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React, { JSX } from 'react';

// ✅ Type explicitly with no confusion
interface LayoutProps {
  children: React.ReactNode;
  params: { id: string }; // Must be plain object, not Promise
}

export default async function DocLayout({
  children,
  params,
}: LayoutProps): Promise<JSX.Element> {
  const { id } = params; // ✅ Do NOT await this

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
