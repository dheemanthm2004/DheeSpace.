"use client";
import * as Y from "yjs";
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
import { Input } from "./ui/input";
import { BotIcon, MessageCircleCode } from "lucide-react";
import Markdown from "react-markdown";
import { BlockNoteEditor } from "@blocknote/core";

function ChatToDocument({ editor }: { editor: BlockNoteEditor }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [input, setInput] = useState("");
  const [conversation, setConversation] = useState<
    { question: string; answer: string }[]
  >([]);

  const handleAskQuestion = async (e: FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        // Correct method to get Markdown content
        const documentData = await editor.blocksToMarkdownLossy(editor.document);
        
        const res = await fetch("/api/chatToDocument", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            question: input,
            documentData,
          }),
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.error || "Unknown error");

        setConversation((prev) => [
          ...prev,
          { question: input, answer: data.message },
        ]);
        setInput("");
        toast.success("AI responded!");
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "AI service unavailable"
        );
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button asChild variant="outline">
        <DialogTrigger>
          <MessageCircleCode className="mr-2 h-4 w-4" />
          Chat to Document
        </DialogTrigger>
      </Button>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Document AI Assistant</DialogTitle>
          <DialogDescription>
            Ask questions about the current document
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 max-h-[500px] overflow-y-auto">
          {conversation.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-primary">
                <span className="font-semibold">You:</span>
                {item.question}
              </div>
              <div className="flex items-start gap-2 text-sm">
                <BotIcon className="w-4 h-4 mt-1 text-muted-foreground" />
                <div className="prose prose-sm max-w-none">
                  <Markdown>{item.answer}</Markdown>
                </div>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleAskQuestion} className="mt-4">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about the document..."
              disabled={isPending}
            />
            <Button type="submit" disabled={!input || isPending}>
              {isPending ? "Asking..." : "Ask"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default ChatToDocument;
