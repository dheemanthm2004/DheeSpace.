"use client";
import * as Y from 'yjs';
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
import { FormEvent, useState, useTransition } from "react";
import { Button } from "./ui/button";
import { usePathname, useRouter } from "next/navigation";
import { deleteDocument, inviteUserToDocument } from "@/actions/actions";
import { toast } from "sonner";
import { Input } from "./ui/input";
import { BotIcon, MessageCircleCode } from 'lucide-react';
import Markdown from 'react-markdown';

function ChatToDocument({ doc }: { doc: Y.Doc }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isPending, startTransition] = useTransition();
    const [input, setInput] = useState("");
    const[summary,setSummary]=useState("");
    const[question,setQuestion]=useState("");
    const handleAskQuestion = async (e: FormEvent ) => { 
        e.preventDefault();
        setQuestion(input);

            startTransition(async () => {
                const documentData = doc.get("document-store").toJSON();

                const res= await fetch(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/chatToDocument`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        question: input,
                        documentData,
                    }),
                });
                if (res.ok) {
                    const { message } = await res.json();
                    
                    setInput("");
                    setSummary(message);
                    toast.success("AI is thinking...");
                }
            }
            )
            
        
      };
      
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <Button 
        asChild
        variant="outline">
      <DialogTrigger>
        <MessageCircleCode className="mr-2 h-4 w-4" />
        Chat to Document
      </DialogTrigger>
        </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Ask Questions to Document
          </DialogTitle>
          <DialogDescription>
            Enter your question and get the answer from the document.
            <br />
            </DialogDescription>
            <hr  className='mt-5'/>
            {
                question && <p className='mt-5 text-gray-500'>Q:{question}</p>
            }
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
        className="flex gap-2"
        onSubmit={handleAskQuestion}>
            <Input
             type="text"
                placeholder="Enter your question"
                className="w-full"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                required
            />
            <Button
            type="submit"
            disabled={!input || isPending}
            >
            {isPending ? "Asking..." : "Ask"}
            </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default ChatToDocument;
