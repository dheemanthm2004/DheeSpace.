"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FormEvent, useState, useTransition } from "react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { LanguagesIcon, MessageCircleCode } from "lucide-react";
import Markdown from "react-markdown";
import { BlockNoteEditor } from "@blocknote/core";

const SUPPORTED_LANGUAGES = [
  "english", "hindi", "kannada", "spanish", "french", "german",
  "chinese", "japanese", "korean", "arabic", "russian", "portuguese",
  "bengali", "tamil", "telugu", "marathi", "urdu", "gujarati",
  "punjabi", "malayalam"
] as const;

function TranslateDocument({ editor }: { editor: BlockNoteEditor }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [language, setLanguage] = useState("spanish");
  const [translatedContent, setTranslatedContent] = useState("");

  const handleTranslate = async (e: FormEvent) => {
    e.preventDefault();

    startTransition(async () => {
      try {
        const documentContent = await editor.blocksToMarkdownLossy(editor.document);

        const res = await fetch("/api/translateDocument", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            content: documentContent,
            targetLang: language,
          }),
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.error || "Translation failed");
        
        setTranslatedContent(data.translatedText);
        toast.success("Document translated!");
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Translation service unavailable"
        );
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button asChild variant="outline">
        <DialogTrigger>
          <LanguagesIcon className="mr-2 h-4 w-4" />
          Translate Document
        </DialogTrigger>
      </Button>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Document Translation</DialogTitle>
          <DialogDescription>
            Translate the current document to another language
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {translatedContent && (
            <div className="p-4 border rounded-md">
              <div className="prose prose-sm max-w-none">
                <Markdown>{translatedContent}</Markdown>
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleTranslate} className="mt-4">
          <div className="flex gap-2">
            <Select
              value={language}
              onValueChange={(value) => setLanguage(value)}
              disabled={isPending}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <SelectItem key={lang} value={lang}>
                    {lang.charAt(0).toUpperCase() + lang.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button type="submit" disabled={isPending}>
              {isPending ? "Translating..." : "Translate"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default TranslateDocument;




// "use client";
// import * as Y from "yjs";
// import React, { FormEvent } from "react";
// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Button } from "./ui/button";
// import { Input } from "./ui/input";
// import { LanguagesIcon } from "lucide-react";
// import { toast } from "sonner";
// import "./TranslateStyles.css"; // Custom styles scoped to this file

// type Language =
//   | "english"
//   | "hindi"
//   | "kannada"
//   | "spanish"
//   | "french"
//   | "german"
//   | "chinese"
//   | "japanese"
//   | "korean"
//   | "arabic"
//   | "russian"
//   | "portuguese"
//   | "bengali"
//   | "tamil"
//   | "telugu"
//   | "marathi"
//   | "urdu"
//   | "gujarati"
//   | "punjabi"
//   | "malayalam";

// const languages: Language[] = [
//   "english",
//   "hindi",
//   "kannada",
//   "spanish",
//   "french",
//   "german",
//   "chinese",
//   "japanese",
//   "korean",
//   "arabic",
//   "russian",
//   "portuguese",
//   "bengali",
//   "tamil",
//   "telugu",
//   "marathi",
//   "urdu",
//   "gujarati",
//   "punjabi",
//   "malayalam",
// ];

// function TranslateDocument({ doc }: { doc: Y.Doc }) {
//   const [isOpen, setIsOpen] = React.useState(false);
//   const [language, setLanguage] = React.useState<string>("");
//   const [summary, setSummary] = React.useState("");
//   const [question, setQuestion] = React.useState("");
//   const [isPending, startTransition] = React.useTransition();

//   const handleAskQuestion = async (e: FormEvent) => {
//     e.preventDefault();

//     startTransition(async () => {
//       const documentData = doc.get("document-store").toJSON();

//       const res = await fetch(
//         `${process.env.NEXT_PUBLIC_BASE_URL}/translateDocument`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             documentData,
//             targetLang: language,
//           }),
//         }
//       );

//       if (res.ok) {
//         const { translated_text } = await res.json();
//         setSummary(translated_text);
//         toast.success("Document translated successfully!");
//       }
//     });
//   };

//   return (
//     <Dialog open={isOpen} onOpenChange={setIsOpen}>
//       <Button
//         asChild
//         variant="outline"
//         className="translate-trigger-btn"
//       >
//         <DialogTrigger className="flex items-center gap-2">
//           <LanguagesIcon className="w-4 h-4" />
//           <span>Translate</span>
//         </DialogTrigger>
//       </Button>
//       <DialogContent className="translate-dialog-content">
//         <DialogHeader>
//           <DialogTitle className="translate-title">
//             Translate the Document
//           </DialogTitle>
//           <DialogDescription className="translate-desc">
//             Select a language and AI will translate a summary of the document into it ✨
//           </DialogDescription>

//           <div className="translate-separator" />

//           {question && (
//             <p className="mt-2 text-purple-600 italic text-sm">
//               Q: {question}
//             </p>
//           )}
//         </DialogHeader>

//         <form
//           className="translate-form"
//           onSubmit={handleAskQuestion}
//         >
//           <Select
//             value={language}
//             onValueChange={(value) => setLanguage(value)}
//           >
//             <SelectTrigger className="translate-select">
//               <SelectValue placeholder="Select Language" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectGroup>
//                 <SelectLabel>Languages</SelectLabel>
//                 {languages.map((language) => (
//                   <SelectItem key={language} value={language}>
//                     {language.charAt(0).toUpperCase() + language.slice(1)}
//                   </SelectItem>
//                 ))}
//               </SelectGroup>
//             </SelectContent>
//           </Select>
//           <Button
//             type="submit"
//             disabled={!language || isPending}
//             className="translate-button"
//           >
//             {isPending ? "Translating..." : "Translate"}
//           </Button>
//         </form>

//         {summary && (
//           <div className="translate-summary">
//             <h4>📝 Summary:</h4>
//             <p>{summary}</p>
//           </div>
//         )}
//       </DialogContent>
//     </Dialog>
//   );
// }

// export default TranslateDocument;
