
"use server";

import { adminDb } from "@/firebase-admin";
import liveblocks from "@/lib/liveblocks";
import { auth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/clerk-sdk-node"; // <-- Add this import

export async function createNewDocument() {
  const { userId, sessionClaims } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const docCollectionRef = adminDb.collection("documents");
  const docRef = await docCollectionRef.add({
    title: "NewDoc",
  });

  await adminDb
    .collection("users")
    .doc(sessionClaims?.email!)
    .collection("rooms")
    .doc(docRef.id)
    .set({
      userId: sessionClaims?.email!,
      role: "owner",
      createdAt: new Date(),
      roomId: docRef.id,
    });

  return { docId: docRef.id };
}

export async function deleteDocument(roomId: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");
  console.log("deleteDocument", roomId);

  try {
    await adminDb.collection("documents").doc(roomId).delete();

    const query = await adminDb
      .collectionGroup("rooms")
      .where("roomId", "==", roomId)
      .get();

    const batch = adminDb.batch();
    query.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });

    await batch.commit();
    await liveblocks.deleteRoom(roomId);

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}

// ----------- INVITE USER WITH CLERK CHECK -----------
export async function inviteUserToDocument(roomId: string, email: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  // Fetch users from Clerk by email
  const users = await clerkClient.users.getUserList({ emailAddress: [email] });
  if (!users || users.data.length === 0) {
    // No user found with that email
    return { success: false, reason: "not_found" };
  }

  // Use the first user in the data array
  const user = users.data[0];
  const isVerified = user.emailAddresses.some(
    (e) => e.emailAddress === email && e.verification?.status === "verified"
  );
  if (!isVerified) {
    return { success: false, reason: "not_verified" };
  }

  try {
    await adminDb
      .collection("users")
      .doc(email)
      .collection("rooms")
      .doc(roomId)
      .set({
        userId: email,
        role: "editor",
        createdAt: new Date(),
        roomId,
      });

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}

export async function remveUserFromDocument(roomId: string, email: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  console.log("removeUserFromDocument", roomId, email);

  try {
    await adminDb
      .collection("users")
      .doc(email)
      .collection("rooms")
      .doc(roomId)
      .delete();

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}
