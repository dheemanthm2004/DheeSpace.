



import { db } from '@/firebase';
import { doc } from 'firebase/firestore';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { useDocumentData } from 'react-firebase-hooks/firestore';

function SidebarOption({ href, id }: { href: string; id: string }) {
  const [data] = useDocumentData(doc(db, "documents", id));
  const pathname = usePathname();
  const isActive = href.includes(pathname ?? "") && pathname !== "/";

  if (!data) return null;

  return (
    <Link
      href={href}
      className={`block px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium truncate
        ${
          isActive
            ? "bg-purple-200 text-purple-900 shadow-inner"
            : "bg-white/70 hover:bg-pink-100 hover:shadow-sm text-gray-700"
        }
      `}
    >
      {data?.title}
    </Link>
  );
}

export default SidebarOption;
