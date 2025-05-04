// import { initializeApp, cert, getApps, getApp, App } from "firebase-admin/app";
// import { getFirestore } from "firebase-admin/firestore";

// // Use require OR import depending on your setup
// const serviceKey = require("@/service_key.json");

// let app: App;

// if (getApps().length === 0) {
//   app = initializeApp({
//     credential: cert(serviceKey),
//   });
// } else {
//   app = getApp();
// }

// const adminDb = getFirestore(app);

// export { app as adminApp, adminDb };
import { initializeApp, cert, getApps, getApp, App } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// Decode the base64-encoded JSON string from env
const base64 = process.env.FIREBASE_ADMIN_KEY_BASE64;

if (!base64) {
  throw new Error("Missing Firebase Admin credentials in environment variables.");
}

const serviceKey = JSON.parse(Buffer.from(base64, "base64").toString("utf-8"));

let app: App;

if (getApps().length === 0) {
  app = initializeApp({
    credential: cert(serviceKey),
  });
} else {
  app = getApp();
}

const adminDb = getFirestore(app);

export { app as adminApp, adminDb };
