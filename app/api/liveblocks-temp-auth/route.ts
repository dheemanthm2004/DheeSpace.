// app/api/liveblocks-temp-auth/route.ts

import { NextRequest } from "next/server"
import liveblocks from "@/lib/liveblocks"

export async function POST(req: NextRequest) {
  const { room } = await req.json()

  // Allow only rooms that start with "temp-"
  if (!room || !room.startsWith("temp-")) {
    return new Response("Unauthorized", { status: 403 })
  }

  // Generate a Liveblocks session without user info
  const session = liveblocks.prepareSession(`guest-${room}`, {
    userInfo: {
      name: "Anonymous",
      email: "guest@dheespace.ai",
      avatar: "https://api.dicebear.com/7.x/shapes/svg?seed=guest",
    },
  })

  session.allow(room, session.FULL_ACCESS)
  const { status, body } = await session.authorize()

  return new Response(body, { status })
}
