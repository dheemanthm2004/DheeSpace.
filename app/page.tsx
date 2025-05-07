// import { ArrowLeftCircle } from "lucide-react";

// export default function Home() {
//   return (
//     <main className="flex items-center gap-3 p-1 animate-pulse text-gray-800">
//       {/* Left Arrow Icon */}
//       <ArrowLeftCircle className="w-10 h-10 text-gray-600" />

//       {/* Text */}
//       <h1 className="text-lg font-semibold">
//         Get started with creating a <span className="underline">New Document</span>
//       </h1>
//     </main>
//   );
// }
'use client'
import { ArrowRight } from "lucide-react";
import NewDocumentButton from '@/components/NewDocumentButton';

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-white to-purple-200 px-4">
      <div className="text-center space-y-6 max-w-xl">
        <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight drop-shadow-sm">
          Your space to think, write & create together.
        </h1>
        <p className="text-lg text-gray-700">
          Real-time docs. Live cursors. AI that actually helps.  
          Welcome to a smarter, calmer way to work.
        </p>
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 pt-2">
          <span>📝 Create docs solo or with friends</span>
          <span>🤝 Invite & collaborate in real-time</span>
          <span>🧠 Chat with your doc (yes, really)</span>
          <span>🌍 Instantly translate & summarize</span>
        </div>
        <div className="inline-flex items-center gap-2 pt-6">
          <NewDocumentButton />
          <ArrowRight className="w-5 h-5 text-black" />
        </div>
      </div>
    </main>
  );
}

