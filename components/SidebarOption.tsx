import { db } from '@/firebase';
import { doc } from 'firebase/firestore';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'
import { useDocumentData } from 'react-firebase-hooks/firestore';

function SidebarOption({href,id}:{
    href: string;
    id: string;
} ){
  const[data,loading,error]=useDocumentData(doc(db,"documents",id));
  const pathname=usePathname();
  const isACtive=href.includes(pathname) && pathname!=="/";
  if(!data) return null;
  return (
    <Link
  href={href}
  className={`mb-2 block border-[1px] p-2 rounded-md transition-all ${
    isACtive
      ? "bg-gray-300 font-semibold border-black"
      : "border-gray-300 hover:border-gray-400 hover:bg-gray-100"
  }`}
>
  <p className="truncate text-sm text-gray-800">{data?.title}</p>
</Link>


    
  )
}

export default SidebarOption