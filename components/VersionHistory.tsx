// components/VersionHistory.tsx
"use client";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { doc, collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase";
import { toast } from "sonner";
import { diffLines } from "diff";
import Markdown from "react-markdown";

type Version = {
  id: string;
  content: string;
  createdAt: string;
};

export default function VersionHistory({ docId, currentContent }: { docId: string; currentContent: string }) {
  const [open, setOpen] = useState(false);
  const [versions, setVersions] = useState<Version[]>([]);
  const [selected, setSelected] = useState<Version | null>(null);
  const [diff, setDiff] = useState<string>("");

  useEffect(() => {
    const fetchVersions = async () => {
      try {
        const ref = collection(db, "documents", docId, "versions");
        const q = query(ref, orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          content: doc.data().content,
          createdAt: doc.data().createdAt?.toDate().toLocaleString() ?? "Unknown",
        }));
        setVersions(data);
      } catch (err) {
        toast.error("Failed to load versions");
      }
    };

    if (open) fetchVersions();
  }, [open, docId]);

  const handleSelect = (version: Version) => {
    setSelected(version);
    const differences = diffLines(version.content, currentContent);
    const diffMarkdown = differences
  .map((part) => {
    const trimmed = part.value.trim();
    if (!trimmed) return ""; // skip empty diffs
    if (part.added)
      return `\n**Updated**\n\`\`\`md\n${trimmed}\n\`\`\``;
    if (part.removed)
      return `\n**Updated:**\n\`\`\`md\n${trimmed}\n\`\`\``;
    return "";
  })
  .join("\n");

    setDiff(diffMarkdown);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline">🕓 Version History</Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-full sm:w-[480px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>📜 Version History</SheetTitle>
        </SheetHeader>

        <div className="space-y-3 mt-4">
          {versions.length === 0 ? (
            <p className="text-sm text-muted-foreground">No versions found.</p>
          ) : (
            versions.map((v) => (
              <div key={v.id} className="p-2 rounded-md border shadow-sm bg-white">
                <div className="flex justify-between items-center">
                  <div className="text-xs text-gray-600">{v.createdAt}</div>
                  <Button size="sm" variant="secondary" onClick={() => handleSelect(v)}>
                    View Diff
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>

        {selected && diff && (
          <div className="mt-6 border-t pt-4">
            <div className="flex items-center justify-between mb-2">
  <h3 className="text-sm font-bold">Changes from selected version</h3>
  <Button
    size="sm"
    variant="outline"
    onClick={() => {
      navigator.clipboard.writeText(selected.content);
      toast.success("Copied version content! You can now paste into the editor.");
    }}
  >
    📋 Copy to Clipboard
  </Button>
</div>

<div className="prose prose-sm whitespace-pre-wrap">
  <Markdown>{diff}</Markdown>
</div>

          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
