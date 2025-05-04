import { adminDb } from "@/firebase-admin";
import liveblocks from "@/lib/liveblocks";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { userId, sessionClaims } = await auth();

  const email = sessionClaims?.email;
  const fullName = sessionClaims?.fullName;
  const image = sessionClaims?.image;

  if (!userId || !email || !fullName || !image) {
    return new Response('Unauthorized: Missing session information', { status: 401 });
  }

  const { room } = await request.json();

  const session = liveblocks.prepareSession(email, {
    userInfo: {
      name: fullName,
      email,
      avatar: image,
    },
  });

  const usersInRoom = await adminDb
    .collectionGroup("rooms")
    .where("userId", "==", email)
    .get();

  const userInRoom = usersInRoom.docs.find((doc) => doc.id === room);

  if (userInRoom?.exists) {
    session.allow(room, session.FULL_ACCESS);
    const { body, status } = await session.authorize();

    console.log("Session authorized:");
    return new Response(body, { status });
  } else {
    return NextResponse.json(
      { message: "You are not in this room" },
      { status: 403 }
    );
  }
}



// import { adminDb } from "@/firebase-admin";
// import liveblocks from "@/lib/liveblocks";
// import { auth } from "@clerk/nextjs/server";
// import { NextRequest, NextResponse } from "next/server";

// export async function POST(request: NextRequest) {
//   const { userId, sessionClaims } = await auth();
  
//   if (!userId) {
//     return new Response('Unauthorized', { status: 401 });
//   }
  
//   const { room } = await request.json();
//   const session = liveblocks.prepareSession(sessionClaims?.email!, {
//     userInfo: {
//       name: sessionClaims?.fullName!,
//       email: sessionClaims?.email!,
//       avatar: sessionClaims?.image!,
//     },
//   });
//   const usersInRoom = await adminDb
//   .collectionGroup("rooms")
//   .where("userId", "==", sessionClaims?.email)
//   .get();

// const userInRoom = usersInRoom.docs.find((doc) => doc.id === room);

// if (userInRoom?.exists) {
//   session.allow(room, session.FULL_ACCESS);
//   const { body, status } = await session.authorize();

//   console.log("Session authorized:");
//   return new Response(body, { status });
// } else {
//   return NextResponse.json(
//     { message: "You are not in this room" },
//     { status: 403 }
//   );
// }


// }
