// import Document from '@/components/Document';

// interface TempPageProps {
//   params: Promise<{ slug: string }>;
// }

// async function TempPage({ params }: TempPageProps) {
//   const { slug } = await params;
//   const tempId = `temp-${slug}`;
  
//   return (
//     <div className="flex flex-col flex-1 min-h-screen">
//       <Document id={tempId} isTemporary />
//     </div>
//   );
// }

// export default TempPage;
import Document from '@/components/Document';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function TempPage({ params }: PageProps) {
  const { slug } = await params; // Awaiting the promise
  return (
    <div className="flex flex-col flex-1 min-h-screen">
      <Document id={`temp-${slug}`} isTemporary key={slug} />
    </div>
  );
}
