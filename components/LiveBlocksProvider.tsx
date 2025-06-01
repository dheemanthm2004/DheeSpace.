

'use client'

import { LiveblocksProvider } from '@liveblocks/react'
import React from 'react'
import { usePathname } from 'next/navigation'

function LiveBlocksProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isTempDoc = pathname?.startsWith('/temp/')

  if (!process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY) {
    throw new Error('Missing NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY')
  }

  return (
    <LiveblocksProvider
      throttle={16}
      authEndpoint={isTempDoc ? '/api/liveblocks-temp-auth' : '/auth-endpoint'}
      largeMessageStrategy="split" // Add this line
    >
      {children}
    </LiveblocksProvider>
  )
}

export default LiveBlocksProvider

