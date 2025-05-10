'use client'

import NewDocumentButton from '@/components/NewDocumentButton'
import TemporaryDocumentButton from '@/components/TemporaryDocumentButton'

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-white to-purple-200 px-2 sm:px-4">
      <div className="text-center space-y-6 max-w-xl w-full">
        {/* Logo */}
        <div className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-fuchsia-500 via-purple-500 to-pink-400 text-transparent bg-clip-text drop-shadow tracking-widest">
          DheeSpace
        </div>

        {/* Hero Title */}
        <h1 className="text-xl sm:text-4xl font-semibold text-gray-900 tracking-tight leading-snug drop-shadow-sm">
          Your space to think, write & vibe together.
        </h1>

        {/* Subtext */}
        <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-light">
          Real-time docs. Live cursors. Chat & translate built-in.
          Export to PDF/DOCX. Temporary or not, you’re always welcome here.
        </p>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-600 pt-2 px-2 sm:px-4">
          {[
            "📝 Create docs solo or with friends",
            "🌍 AI Chat & Translate",
            "⚡️ Temporary docs = no login needed",
            "📤 Export to PDF or Word"
          ].map((text, idx) => (
            <div
              key={idx}
              className="bg-white/70 backdrop-blur-md py-2 px-3 rounded-xl shadow-sm transition-transform duration-200 hover:shadow-md hover:-translate-y-1 hover:bg-white/80"
            >
              {text}
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-6">
          <NewDocumentButton />
          <TemporaryDocumentButton />
        </div>

        {/* Tagline */}
        <p className="text-xs text-gray-500 pt-4 italic">
          Made with ❤️ by the Dheem!
        </p>
      </div>
    </main>
  )
}
