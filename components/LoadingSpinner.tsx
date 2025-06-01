import React, { useEffect, useState } from 'react';

const messages = [
  "Manifesting your doc... 🔮",
  "Aligning brainwaves 🧠💫",
  "Rendering thoughts 📝✨",
  "Sprinkling AI magic... 🪄",
];

function LoadingSpinner() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#f9f7ff] to-[#e0d4fd]">
      <div className="relative flex flex-col items-center justify-center p-6 rounded-3xl shadow-2xl backdrop-blur-xl border border-white/30 bg-white/20 animate-pulse animate-float">
        {/* Glow Spinner */}
        <div className="w-24 h-24 animate-spin-slow rounded-full border-t-4 border-purple-500 border-dashed flex items-center justify-center">
          <span className="text-4xl animate-bounce drop-shadow-[0_0_12px_#c084fc]">🌀</span>
        </div>

        {/* Rotating Message */}
        <p className="mt-4 text-sm tracking-wide text-purple-600 font-medium animate-fadeIn text-center">
          {messages[messageIndex]}
        </p>

        {/* Cute Sparkles */}
        <div className="absolute -top-3 -left-3 text-xl text-purple-400 animate-ping">✨</div>
        <div className="absolute -bottom-3 -right-3 text-lg text-purple-300 animate-ping">💫</div>
      </div>
    </div>
  );
}

export default LoadingSpinner;

