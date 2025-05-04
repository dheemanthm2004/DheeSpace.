"use client";
import * as Y from 'yjs';
import React, { FormEvent } from 'react';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "./ui/button";
import { Input } from './ui/input';
import { BotIcon, LanguagesIcon } from 'lucide-react';
import { toast } from 'sonner';
import Markdown from "react-markdown";

type Language =
    | "english" | "hindi" | "kannada" | "spanish" | "french"
    | "german" | "chinese" | "japanese" | "korean" | "arabic"
    | "russian" | "portuguese" | "bengali" | "tamil" | "telugu"
    | "marathi" | "urdu" | "gujarati" | "punjabi" | "malayalam";

const languages: Language[] = [
    "english", "hindi", "kannada", "spanish", "french", "german",
    "chinese", "japanese", "korean", "arabic", "russian", "portuguese",
    "bengali", "tamil", "telugu", "marathi", "urdu", "gujarati",
    "punjabi", "malayalam"
];

function TranslateDocument({ doc }: { doc: Y.Doc }) {
    const [isOpen, setIsOpen] = React.useState(false);
    const [language, setLanguage] = React.useState<string>("");
    const [summary, setSummary] = React.useState("");
    const [question, setQuestion] = React.useState("");
    const [isPending, startTransition] = React.useTransition();

    const handleAskQuestion = async (e: FormEvent) => {
        e.preventDefault();

        startTransition(async () => {
            const documentData = doc.get("document-store").toJSON();

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_URL}/translateDocument`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        documentData,
                        targetLang: language,
                    }),
                }
            );
            if (res.ok) {
                const { translated_text } = await res.json();
                setSummary(translated_text);
                toast.success("Document translated successfully!");
            }
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <Button asChild variant="outline">
                <DialogTrigger>
                    <LanguagesIcon />
                    Translate
                </DialogTrigger>
            </Button>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Translate the Document</DialogTitle>
                    <DialogDescription>
                        Select the language and AI will translate a summary of the document in selected language.
                    </DialogDescription>
                    <hr className='mt-5' />

                    {question && (
                        <p className='mt-5 text-gray-500'>Q: {question}</p>
                    )}
                </DialogHeader>

                {summary && (
                    <div className="flex flex-col items-start max-h-96 overflow-y-scroll gap-2 p-5 bg-gray-100">
                        <div className="flex items-center gap-2">
                            <BotIcon className="w-4 h-4 text-gray-500" />
                            <p className="text-gray-500 text-sm">
                                AI {isPending ? "is processing..." : "translated a summary"}
                            </p>
                        </div>
                        <div className="text-sm text-gray-700 w-full">
                            {isPending ? "Thinking..." : <Markdown>{summary}</Markdown>}
                        </div>
                    </div>
                )}

                <form
                    className="flex gap-2 mt-4"
                    onSubmit={handleAskQuestion}
                >
                    <Select
                        value={language}
                        onValueChange={(value) => setLanguage(value)}
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select Language" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Languages</SelectLabel>
                                {languages.map((lang) => (
                                    <SelectItem key={lang} value={lang}>
                                        {lang.charAt(0).toUpperCase() + lang.slice(1)}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                    <Button
                        type="submit"
                        disabled={!language || isPending}
                    >
                        {isPending ? "Translating..." : "Translate"}
                    </Button>
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
