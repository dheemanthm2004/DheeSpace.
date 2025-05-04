import { ArrowLeftCircle } from "lucide-react";

export default function Home() {
  return (
    <main className="flex items-center gap-3 p-1 animate-pulse text-gray-800">
      {/* Left Arrow Icon */}
      <ArrowLeftCircle className="w-10 h-10 text-gray-600" />

      {/* Text */}
      <h1 className="text-lg font-semibold">
        Get started with creating a <span className="underline">New Document</span>
      </h1>
    </main>
  );
}
