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

import NewDocumentButton from '@/components/NewDocumentButton'
import TemporaryDocumentButton from '@/components/TemporaryDocumentButton'

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-white to-purple-200 px-4">
      <div className="text-center space-y-6 max-w-xl">
        
        {/* DheeSpace logo aesthetic */}
        <div className="text-5xl font-extrabold bg-gradient-to-r from-fuchsia-500 via-purple-500 to-pink-400 text-transparent bg-clip-text drop-shadow tracking-widest">
          DheeSpace
        </div>

        {/* Hero Title */}
        <h1 className="text-3xl sm:text-5xl font-semibold text-gray-900 tracking-tight leading-tight drop-shadow-sm">
          Your space to think, write & vibe together.
        </h1>

        {/* Subtext */}
        <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-light">
          Real-time docs. Live cursors. AI that actually listens.  
          Temporary or not, you’re always welcome here.
        </p>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-600 pt-2 px-4">
          {[
            "📝 Create docs solo or with friends",
            "🤝 Invite & collaborate in real-time",
            "⚡️ No login? No problem – temp docs temp docs for you!",
            "🌍 Translate, summarize, vibe instantly"
          ].map((text, idx) => (
            <div
              key={idx}
              className="bg-white/70 backdrop-blur-md py-2 px-3 rounded-xl shadow-sm transition-transform duration-200 hover:shadow-md hover:-translate-y-1 hover:bg-white/80"
            >
              {text}
            </div>
          ))}
        </div>

        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-6">
          <NewDocumentButton />
          <TemporaryDocumentButton />
        </div>

        {/* Friendly tagline */}
        <p className="text-xs text-gray-500 pt-4 italic">
          Built for the bold. No login required. Just start.
        </p>
      </div>
    </main>
  )
}


