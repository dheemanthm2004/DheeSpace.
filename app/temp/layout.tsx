

import LiveBlocksProvider from "@/components/LiveBlocksProvider"

export default function TempPageLayout({ children }: { children: React.ReactNode }) {
  return <LiveBlocksProvider>{children}</LiveBlocksProvider>
}
