'use client'
import { LiveblocksProvider } from '@liveblocks/react'
import React from 'react'

function LiveBlocksProvider({
    children
}:{
    children: React.ReactNode
}) {
    if (!process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY) {
        throw new Error('Missing NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY')
    }
  return (
    <LiveblocksProvider
    throttle={16}
    authEndpoint={"/auth-endpoint"}>
        {children}
        </LiveblocksProvider>
  )
}

export default LiveBlocksProvider