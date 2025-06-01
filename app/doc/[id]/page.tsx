import Document from '@/components/Document';

interface DocumentPageProps {
  params: Promise<{ id: string }>;
}

async function DocumentPage({ params }: DocumentPageProps) {
  const { id } = await params;

  return (
    <div className="flex flex-col flex-1 min-h-screen">
      <Document id={id} />
    </div>
  );
}

export default DocumentPage;

