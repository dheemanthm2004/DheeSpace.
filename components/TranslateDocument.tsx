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
    <div className="p-4 border rounded-md max-h-[400px] overflow-y-auto">
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



