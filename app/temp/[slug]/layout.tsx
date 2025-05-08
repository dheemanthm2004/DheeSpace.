import RoomProvider from '@/components/RoomProvider';
import { ReactNode } from 'react';

interface TempLayoutProps {
  children: ReactNode;
  params: Promise<{ slug: string }>;
}

async function TempLayout({ children, params }: TempLayoutProps) {
  const { slug } = await params;
  const roomId = `temp-${slug}`;
  
  return <RoomProvider roomId={roomId}>{children}</RoomProvider>;
}

export default TempLayout;
