import RoomProvider from '@/components/RoomProvider'

export default function TempLayout({ children, params }: {
  children: React.ReactNode
  params: { slug: string }
}) {
  const roomId = `temp-${params.slug}`
  return <RoomProvider roomId={roomId}>{children}</RoomProvider>
}
