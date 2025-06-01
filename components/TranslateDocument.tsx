

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
import { LanguagesIcon } from "lucide-react";
import Markdown from "react-markdown";
import { BlockNoteEditor } from "@blocknote/core";

const SUPPORTED_LANGUAGES = [
  "english", "hindi", "kannada", "spanish", "french", "german",
  "chinese", "japanese", "korean", "arabic", "russian", "portuguese",
  "bengali", "tamil", "telugu", "marathi", "urdu", "gujarati",
  "punjabi", "malayalam"
] as const;

// Custom image component to prevent empty src
const MarkdownImage = (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
  if (!props.src) return null;
  return <img {...props} alt={props.alt || ""} className="max-w-full h-auto" />;
};

function TranslateDocument({ editor }: { editor: BlockNoteEditor }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [language, setLanguage] = useState("kannada");
  const [translatedContent, setTranslatedContent] = useState("");

  function isLocalImageMarkdown(md: string) {
    return /\!\[.*\]\((data:image\/[a-zA-Z]+;base64,|blob:)[^)]+\)/.test(md);
  }

  const handleTranslate = async (e: FormEvent) => {
    e.preventDefault();

    startTransition(async () => {
      try {
        const blocks = editor.document;
        const markdownBlocks: string[] = await Promise.all(
          blocks.map(async (block) => 
            editor.blocksToMarkdownLossy([block])
          )
        );

        let contentForTranslation = "";
        const imageMap: Map<string, string> = new Map();
        let imageCount = 0;

        markdownBlocks.forEach((md) => {
          if (isLocalImageMarkdown(md)) {
            const placeholder = `%%IMAGE_${imageCount}%%`;
            imageMap.set(placeholder, md);
            contentForTranslation += `\n\n${placeholder}\n\n`;
            imageCount++;
          } else {
            contentForTranslation += `\n\n${md}\n\n`;
          }
        });

        const res = await fetch("/api/translateDocument", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            content: contentForTranslation,
            targetLang: language,
          }),
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || "Translation failed");
        }

        const data = await res.json();
        let finalContent = data.translatedText;

        imageMap.forEach((md, placeholder) => {
          finalContent = finalContent.replace(placeholder, md);
        });

        setTranslatedContent(finalContent);
        toast.success("Document translated successfully!");
      } catch (error) {
        console.error("Translation error:", error);
        toast.error(
          error instanceof Error ? error.message : "Failed to translate document"
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
            Translate content while preserving images
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {translatedContent && (
            <div className="p-4 border rounded-md max-h-[400px] overflow-y-auto">
              <div className="prose prose-sm max-w-none">
                <Markdown
                  components={{
                    img: MarkdownImage,
                    a: ({ node, ...props }) => (
                      <a {...props} target="_blank" rel="noopener noreferrer" />
                    )
                  }}
                >
                  {translatedContent}
                </Markdown>
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleTranslate} className="mt-4">
          <div className="flex gap-2">
            <Select
              value={language}
              onValueChange={setLanguage}
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


