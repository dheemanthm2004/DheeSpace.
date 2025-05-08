// "use client";

// import React, { FormEvent, useEffect, useState, useTransition } from 'react'
// import { Input } from './ui/input';
// import { Button } from './ui/button';
// import { doc, updateDoc } from 'firebase/firestore';
// import { db } from '@/firebase';
// import { useDocumentData } from 'react-firebase-hooks/firestore';
// import Editor from './Editor';
// import useOwner from '@/lib/useOwner';
// import DeleteDocument from './DeleteDocument';
// import InviteUser from './InviteUser';
// import ManageUsers from './ManageUsers';
// import Avatarss from './Avatarss';



// function Document({ id, isTemporary = false }: { id: string; isTemporary?: boolean }) {

// const [data]=useDocumentData(doc(db,"documents",id));
// const [input,setInput]=useState("");
// const[isUpdating,startTransition]=useTransition();
// const isOwner = isTemporary ? true : useOwner()


// useEffect(
//     ()=>{
//         if(data){
//             setInput(data.title);
//         }

//     },[data])

// const updateTitle=(e:FormEvent)=>{
//     e.preventDefault();

//     if (input.trim()){
//         startTransition(async () => {
//             await updateDoc(doc(db,"documents",id),{
//                 title:input,
//             });
//         });
//     }
// }
// return (
//     <div className="flex-1 h-full bg-white p-5">
//       <div className="flex max-w-6xl mx-auto justify-between pb-5">
//         <form className="flex flex-1 space-x-2" onSubmit={updateTitle}>
//           {/* update title... */}
//           <Input value={input} onChange={(e) => setInput(e.target.value)} />
//           <Button disabled={isUpdating} type="submit">
//             {isUpdating ? "Updating..." : "Update"}
//           </Button>
//           {/* IF */}
//           {!isTemporary && isOwner && (
//   <>
//     <InviteUser />
//     <DeleteDocument />
//   </>
// )}


//           {/* isOwner && InviteUser, DeleteDocument */}
//         </form>
//       </div>
    
   
//    <div className='flex max-w-6xl mx-auto justify-between items-center mb-5'>
//           <ManageUsers/>
//         {/* 1.manage users
//         2.avatars */}
//         <Avatarss/>



//     </div>
//     <hr className='pb-10'/>
//     {/* // 3.collaborative editor */}
//     <Editor/>
//     </div>
  
// )}

// export default Document
"use client";

import React, { FormEvent, useEffect, useState, useTransition } from 'react'
import { Input } from './ui/input';
import { Button } from './ui/button';
import { doc, setDoc, updateDoc } from 'firebase/firestore'; // 👈 setDoc added
import { db } from '@/firebase';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import Editor from './Editor';
import useOwner from '@/lib/useOwner';
import DeleteDocument from './DeleteDocument';
import InviteUser from './InviteUser';
import ManageUsers from './ManageUsers';
import Avatarss from './Avatarss';

function Document({ id, isTemporary = false }: { id: string; isTemporary?: boolean }) {
  const [data] = useDocumentData(doc(db, "documents", id));
  const [input, setInput] = useState("");
  const [isUpdating, startTransition] = useTransition();
  const isOwner = isTemporary ? true : useOwner();

  // 🔐 Auto-create Firestore doc only for temp docs
  useEffect(() => {
    if (isTemporary) {
      const ref = doc(db, "documents", id);
      setDoc(ref, {
        title: "Temporary Document",
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // Optional 2-week TTL
      }, { merge: true }); // Won’t overwrite if already exists
    }
  }, [id, isTemporary]);

  useEffect(() => {
    if (data) {
      setInput(data.title);
    }
  }, [data]);

  const updateTitle = (e: FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      startTransition(async () => {
        await updateDoc(doc(db, "documents", id), {
          title: input,
        });
      });
    }
  };

  return (
    <div className="flex-1 h-full bg-white p-5">
      <div className="flex max-w-6xl mx-auto flex-col pb-5">

        {/* ✅ TEMPORARY BANNER */}
        {isTemporary && (
          <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded mb-4 text-sm font-medium shadow">
            This is a public, temporary document. Anyone with the link can view & edit.
          </div>
        )}

        <form className="flex space-x-2" onSubmit={updateTitle}>
          <Input value={input} onChange={(e) => setInput(e.target.value)} />
          <Button disabled={isUpdating} type="submit">
            {isUpdating ? "Updating..." : "Update"}
          </Button>

          {/* Only show on permanent documents */}
          {!isTemporary && isOwner && (
            <>
              <InviteUser />
              <DeleteDocument />
            </>
          )}
        </form>
      </div>

      <div className="flex max-w-6xl mx-auto justify-between items-center mb-5">
        <ManageUsers />
        <Avatarss />
      </div>

      <hr className='pb-10' />

      <Editor />
    </div>
  );
}

export default Document;
