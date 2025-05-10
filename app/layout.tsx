import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "DheeSpace",
  description: "Real-time collaboration with Gen-Z aesthetics.",
  openGraph: {
    title: "DheeSpace",
    description: "Real-time collaboration with Gen-Z aesthetics.",
    url: "https://dheespace.vercel.app",
    siteName: "DheeSpace",
    images: [
      {
        url: "https://i.postimg.cc/yYspCNFd/Screenshot-2025-05-08-223558.png",
        width: 1200,
        height: 630,
        alt: "DheeSpace Preview Image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DheeSpace",
    description: "Real-time collaboration with Gen-Z aesthetics.",
    images: ["https://i.postimg.cc/yYspCNFd/Screenshot-2025-05-08-223558.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </head>
        <body className="bg-gradient-to-br from-pink-100 via-purple-150 to-indigo-150 font-poppins transition-all duration-300 overflow-x-hidden">
          <Header />
          <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1 p-2 sm:p-4 bg-red/80 backdrop-blur-xl shadow-inner overflow-y-auto scrollbar-hide rounded-l-3xl">
              {children}
            </div>
          </div>
          <Toaster position="top-center" />
        </body>
      </html>
    </ClerkProvider>
  );
}
