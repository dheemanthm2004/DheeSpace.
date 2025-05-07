// 'use client'
// import React, { useEffect, useState } from 'react'
// import NewDocumentButton from './NewDocumentButton'
// import {
//   Sheet,
//   SheetContent,

//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet"
// import { MenuIcon } from 'lucide-react'
// import { useCollection } from 'react-firebase-hooks/firestore';
// import { useUser } from '@clerk/nextjs'
// import { collectionGroup, DocumentData, query, where } from 'firebase/firestore'
// import { db } from '@/firebase'
// import SidebarOption from './SidebarOption'

// interface RoomDocument extends DocumentData {
//   createdAt: string;
//   role: "owner" | "editor";
//   roomId: string;
//   userId: string;
//   id?: string; // Added because you're spreading `...roomData` and adding id
// }

// function Sidebar() {
//   const { user } = useUser();
//   const [groupedData, setGroupedData] = useState<{
//     owner: RoomDocument[];
//     editor: RoomDocument[];
//   }>({
//     owner: [],
//     editor: [],
//   });

//   const [data] = useCollection(
//     user && query(
//       collectionGroup(db, 'rooms'),
//       where('userId', '==', user.emailAddresses[0].toString())
//     )
//   );

//   useEffect(() => {
//     if (!data) return;

//     const grouped = data.docs.reduce<{
//       owner: RoomDocument[];
//       editor: RoomDocument[];
//     }>(
//       (acc, curr) => {
//         const roomData = curr.data() as RoomDocument;
//         if (roomData.role === 'owner') {
//           acc.owner.push({
//             id: curr.id,
//             ...roomData,
//           });
//         } else {
//           acc.editor.push({
//             id: curr.id,
//             ...roomData,
//           });
//         }
//         return acc;
//       },
//       {
//         owner: [],
//         editor: [],
//       }
//     );
//     setGroupedData(grouped);
//   }, [data]);

//   const menuOptions = (
//     <>
//       <NewDocumentButton />
//       <div className="flex py-4 flex-col space-y-4 md:max-w-36">
//       {/* My Documents */}
//       {groupedData.owner.length === 0 ? (
//         <div className='text-gray-600 text-sm mt-2'>No Documents</div>
//       ) : (
//         <div className='mt-4'>
//           <div className='text-gray-600 text-sm font-semibold mb-2'>My Documents</div>
//           {groupedData.owner.map((doc) => (

            
//             <SidebarOption key={doc.id ?? ''} id={doc.id ?? ''} href={`/doc/${doc.id ?? ''}`}/>
//           ))}
//         </div>
//       )}
//     </div>

//       {/* Shared with me */}
//       {groupedData.editor.length > 0 && (
//   <>
//     <h2 className='text-gray-600 text-sm font-semibold mb-2'>Shared with Me</h2>
//     {groupedData.editor.map((doc) => (
//       <SidebarOption key={doc.id ?? ''} id={doc.id ?? ''} href={`/doc/${doc.id ?? ''}`}/>
//     ))}
//   </>
// )}

        
      



//     </>
    
    
//     // shared with me
//     // list

//   );

//   return (
//     <div className="p-2 md:p-5 bg-gray-200 relative">
//       <div className='md:hidden'>
//         <Sheet>
//           <SheetTrigger>
//             <MenuIcon className="text-gray-600 hover:text-gray-900" />
//           </SheetTrigger>
//           <SheetContent side='left'>
//             <SheetHeader>
//               <SheetTitle>Menu</SheetTitle>
//               <div>
//                 {menuOptions}
//               </div>
//             </SheetHeader>
//           </SheetContent>
//         </Sheet>
//       </div>

//       <div className='hidden md:inline'>
//         {menuOptions}
//       </div>
//     </div>
//   );
// }

// export default Sidebar;


'use client'
import React, { useEffect, useState } from 'react'
import NewDocumentButton from './NewDocumentButton'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { MenuIcon } from 'lucide-react'
import { useCollection } from 'react-firebase-hooks/firestore';
import { useUser } from '@clerk/nextjs'
import { collectionGroup, DocumentData, query, where } from 'firebase/firestore'
import { db } from '@/firebase'
import SidebarOption from './SidebarOption'

interface RoomDocument extends DocumentData {
  createdAt: string;
  role: "owner" | "editor";
  roomId: string;
  userId: string;
  id?: string;
}

function Sidebar() {
  const { user } = useUser();
  const [groupedData, setGroupedData] = useState<{ owner: RoomDocument[]; editor: RoomDocument[] }>({ owner: [], editor: [] });

  const [data] = useCollection(
    user && query(
      collectionGroup(db, 'rooms'),
      where('userId', '==', user.emailAddresses[0].toString())
    )
  );

  useEffect(() => {
    if (!data) return;
    const grouped = data.docs.reduce<{ owner: RoomDocument[]; editor: RoomDocument[] }>((acc, curr) => {
      const roomData = curr.data() as RoomDocument;
      if (roomData.role === 'owner') {
        acc.owner.push({ id: curr.id, ...roomData });
      } else {
        acc.editor.push({ id: curr.id, ...roomData });
      }
      return acc;
    }, { owner: [], editor: [] });
    setGroupedData(grouped);
  }, [data]);

  const menuOptions = (
    <div className="space-y-6">
      <NewDocumentButton />
      <div className="space-y-3 md:max-w-36">
        {groupedData.owner.length === 0 ? (
          <p className='text-sm text-pink-600 mt-4'>No Documents</p>
        ) : (
          <div>
            <h2 className='text-xs font-semibold text-purple-500 uppercase tracking-wide mb-2'>My Documents</h2>
            <div className="space-y-2">
              {groupedData.owner.map((doc) => (
                <SidebarOption key={doc.id ?? ''} id={doc.id ?? ''} href={`/doc/${doc.id ?? ''}`} />
              ))}
            </div>
          </div>
        )}
        {groupedData.editor.length > 0 && (
          <div>
            <h2 className='text-xs font-semibold text-pink-500 uppercase tracking-wide mb-2'>Shared with Me</h2>
            <div className="space-y-2">
              {groupedData.editor.map((doc) => (
                <SidebarOption key={doc.id ?? ''} id={doc.id ?? ''} href={`/doc/${doc.id ?? ''}`} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="p-3 md:p-6 bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 min-h-screen rounded-xl shadow-md">
      <div className='md:hidden'>
        <Sheet>
          <SheetTrigger>
            <MenuIcon className="text-purple-600 hover:text-purple-800" />
          </SheetTrigger>
          <SheetContent side='left'>
            <SheetHeader>
              <SheetTitle className="text-pink-600">Menu</SheetTitle>
              <div>{menuOptions}</div>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
      <div className='hidden md:block'>{menuOptions}</div>
    </div>
  );
}

export default Sidebar;
