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
  params: {
    slug: string
  }
}

export default function TempPage({ params }: PageProps) {
  return (
    <div className="flex flex-col flex-1 min-h-screen">
      <Document 
        id={`temp-${params.slug}`} 
        isTemporary 
        key={params.slug} // Ensure re-render on slug change
      />
    </div>
  );
}
