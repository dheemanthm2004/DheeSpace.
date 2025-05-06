import Document from '@/components/Document';

interface DocumentPageProps {
  params: { id: string } | Promise<{ id: string }>;
}

async function DocumentPage({ params }: DocumentPageProps) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  return (
    <div className="flex flex-col flex-1 min-h-screen">
      <Document id={id} />
    </div>
  );
}

export default DocumentPage;


// import Document from "@/components/Document";

// async function DocumentPage({
//   params,
// }: {
//   params: {
//     id: string;
//   };
// }) {
//   const { id } = await params;  // Destructure `id` after awaiting params

//   return (
//     <div className="flex flex-col flex-1 min-h-screen">
//       <Document id={id} />
//     </div>
//   );
// }

// export default DocumentPage;


// import Document from "@/components/Document";

// function DocumentPage({
//     params:{ id },
// }:{
//     params:{
//         id:string;
//     };
// }) {
//     return (
        
//            <div className="flex flex-col flex-1 min-h-screen">
//             <Document id={id}/>
//            </div>
        
//     );
// }
// export default DocumentPage;