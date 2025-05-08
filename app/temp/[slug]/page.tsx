import Document from '@/components/Document'

interface TempPageProps {
  params: { slug: string }
}

export default function TempPage({ params }: TempPageProps) {
  const tempId = `temp-${params.slug}`
  return (
    <div className="flex flex-col flex-1 min-h-screen">
      <Document id={tempId} isTemporary />
    </div>
  )
}
