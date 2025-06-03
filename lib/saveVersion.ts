import { db } from "@/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export async function saveVersion(docId: string, markdown: string) {
  try {
    const versionRef = collection(db, "documents", docId, "versions");
    await addDoc(versionRef, {
      content: markdown,
      createdAt: serverTimestamp(),
    });
    return { success: true };
  } catch (err) {
    console.error("Error saving version:", err);
    return { success: false, error: err };
  }
}
