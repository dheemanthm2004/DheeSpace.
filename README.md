# 🚀 DheeSpace — Real-Time Collaborative Document Editor with AI Superpowers

> ✍️ Think Notion meets Google Docs — but with Gen-Z vibes, built from scratch using modern full-stack tools. Real-time editing, live cursors, AI Q&A, translate, export... all in one place.

[🔗 Live Demo](https://dheespace.vercel.app) &nbsp;&nbsp;|&nbsp;&nbsp; [📂 View Code](https://github.com/yourusername/dheespace) &nbsp;&nbsp;|&nbsp;&nbsp; [📽️ Demo Video](#)

---

## 🧠 Features

- 🔐 **Auth & Access Control** — Sign in with Clerk, invite/remove collaborators, owner/editor roles
- 📝 **Live Docs** — Real-time collaborative editing powered by **Liveblocks**
- 🧑‍🤝‍🧑 **Presence Avatars** — See who’s online + live cursors with smooth animations
- 🌍 **AI Translate** — Translate your doc to any language using **Gemini 2.5 flash API**
- 🤖 **Chat to Document** — Ask questions about the doc using **Gemini** and get instant answers
- 🧾 **Export to PDF / DOCX** — Download formatted documents with one click
- 🧪 **Temporary Rooms** — Share link, no login needed. Public & disposable docs (like Pastebin on steroids)
- 🎨 **TailwindCSS + Radix UI** — Aesthetic UI with neon highlights and Gen-Z gradients
- 🌐 **Deployed on Vercel** — Lightning-fast global performance

---

## 🛠️ Tech Stack

| Frontend       | Backend           | Realtime / DB         | AI / ML           | Auth & Infra    |
|----------------|-------------------|------------------------|--------------------|-----------------|
| Next.js 15 (App Router) | Server Actions | Firebase Firestore     | GeminiAI      | Clerk Auth      |
| TypeScript     | Node.js (Edge)    | Liveblocks (presence)  | Google Gemini API   | Vercel Hosting  |
| TailwindCSS    | Server Components | Firestore Admin SDK    | Puppeteer (PDF)    | Environment Secured |

---

## 📸 Screenshots

> ⚡️ Add some cool GIFs or images in a `public/demo/` folder and showcase:
> - Landing Page
> - Live Cursors
> - AI Chat Popup
> - Translate in Action

---

## 🚦 How It Works

### 🧾 Document Flow

- Docs are stored in Firestore with metadata (title, owner, createdAt)
- Liveblocks enables multiplayer editing + cursor tracking
- Export options use `@blocknote/pdf-exporter` and `docx` libs

### 🤖 AI Chat to Doc

- Markdown content of doc is sent to OpenAI (via `chatToDocument.js`)
- Response is parsed + displayed in chat window with Markdown support

### 🌐 Temporary Room Mode

- Guest sessions use token-auth via Liveblocks
- No user info needed; avatars and names are randomized
- Docs expire automatically after 14 days

---

## 🧑‍💻 Running Locally

```bash
git clone https://github.com/yourusername/dheespace.git
cd dheespace
pnpm install   # or use yarn / npm
pnpm dev       # starts local dev server
```

### 🔐 Add `.env` file with the following:

```env
FIREBASE_ADMIN_KEY_BASE64=...
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...
CLERK_SECRET_KEY=...
GEMINI_API_KEY=...
LIVEBLOCKS_SECRET_KEY=...
```

> ⚠️ Never commit secrets directly. Use `.env.local` and `.gitignore`.

---

## 💡 Inspiration

This project was built to explore how to:

- Architect full-stack apps using the latest Next.js features
- Integrate real-time editing + collaborative tools
- Build AI-first tools that feel **useful and slick**
- Create something people would actually use beyond simple CRUD apps

---

## 🙋‍♂️ Author

**Dheemanth M**

> Computer Science Undergrad | BMSCE '26  
> Bangalore, India 🇮🇳  
> [LinkedIn](https://www.linkedin.com/in/dheemanth-madaiah-484a43327/) 

---


