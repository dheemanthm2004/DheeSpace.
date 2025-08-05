# 🚀 LiveDocs — Real-time Collaborative Docs with AI + Multiplayer Magic

> ✍️ Notion meets Google Docs — reimagined with AI, live presence, and Gen-Z aesthetics. Built from scratch using bleeding-edge full-stack tools.

[🔗 Live Demo](https://livedocsai.vercel.app) &nbsp;|&nbsp; [📂 Source Code](https://github.com/dheemanthm2004/DheeSpace.)

---

## 🧠 Features

- 📝 **Create & Collaborate** — Rich text editor with real-time multiplayer editing
- 👥 **Live Cursors & Avatars** — See who’s editing + animated avatars (even for guests)
- 🤖 **AI Chat Assistant** — Ask questions about your doc and get smart answers using **Gemini Pro 1.5**
- 🌍 **AI Translate** — Instantly translate the document into any language
- 💾 **Version History** — Save, view diffs, and restore previous versions with one click
- ⚡️ **Temporary Docs** — Share public docs with no login; auto expire after 30 days
- 📤 **Export** — Download your doc as a beautiful PDF or DOCX file
- 🔐 **Access Control** — Invite users with owner/editor roles via Clerk auth
- 🎨 **Gen-Z UI** — Built with TailwindCSS, Radix UI & modern motion — smooth, aesthetic, responsive

---

## 🛠️ Tech Stack

| Layer         | Tech Used                                                                 |
|---------------|---------------------------------------------------------------------------|
| **Frontend**  | Next.js 15 App Router, Server Actions, Server Components, TypeScript      |
| **Realtime**  | Liveblocks + Yjs (cursor presence, syncing, awareness)                    |
| **Database**  | Firebase Firestore + Firestore Admin SDK                                  |
| **Auth**      | Clerk (JWT sessions + role-based access control)                          |
| **AI / ML**   | Gemini 1.5 Pro API (Q&A and Translate)                                     |
| **Exporting** | Puppeteer (PDF), `docx` (Word export)                                     |
| **UI / UX**   | TailwindCSS, ShadCN UI, Framer Motion, Radix UI, Lucide Icons             |
| **Hosting**   | Vercel                                                                     |

---

## 📄 How It Works

### 🔄 Real-time Editing
- Multiplayer editing powered by **Liveblocks + Yjs**
- Firestore stores documents with metadata (title, timestamps, owner)
- Live user presence with animated cursors and random avatars (for guests too!)

### 🧠 AI Features
- **Chat Assistant:** Converts live doc to Markdown → Sends to Gemini → Returns smart responses
- **Translate:** Sends full doc content to Gemini → Translates into chosen language → Renders update

### 💾 Version History
- Auto-saves snapshots on major edits
- Lets users view diffs and restore from history (like Git for docs!)

### 🔐 Role-Based Permissions
- Users log in via Clerk
- Document owners can **invite/edit/remove** collaborators
- Role-based access checked on every session using secure API routes

### ⚡ Temporary/Public Docs
- Create public links (no auth required) that auto-expire after **14 days**
- Ideal for quick sharing and collab without signups

---

## 🎯 Why This Project?

LiveDocs was built to:

- Push the limits of **Next.js 15 full-stack architecture**
- Explore **real-time collaborative systems** with awareness and avatars
- Seamlessly embed **AI tools** into live editing environments
- Deliver a polished, production-grade UX — **not just another CRUD app**

---

## 🧪 Local Setup

```bash
git clone https://github.com/dheemanthm2004/DheeSpace.
cd DheeSpace
pnpm install     # or npm / yarn
pnpm dev         # starts the dev server at localhost:3000
```

### 📁 Create `.env.local`

```env
FIREBASE_ADMIN_KEY_BASE64=your_base64_encoded_key
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_public_key
CLERK_SECRET_KEY=your_clerk_secret_key
GEMINI_API_KEY=your_gemini_api_key
LIVEBLOCKS_SECRET_KEY=your_liveblocks_secret
```

✅ Make sure `.env.local` is added to `.gitignore` to protect your credentials.




---

## 🙋‍♂️ Author

**Dheemanth M**  
BMS College of Engineering, CSE '26  
Bangalore, India 🇮🇳

[🔗 LinkedIn](https://www.linkedin.com/in/dheemanth-madaiah-484a43327/)  


---



