"use client";
import { Button } from "./ui/button";
import { Upload } from "lucide-react";
import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import imageCompression from "browser-image-compression";
import React, { useRef, useState } from "react";

export default function UploadButton({ editor }: { editor: BlockNoteEditor }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [showPreUploadPrompt, setShowPreUploadPrompt] = useState(false);

  const compressOptions = {
    maxSizeMB: 0.5,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };

  const handleUploadClick = () => {
    setShowPreUploadPrompt(true); // Show confirmation first
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    try {
      const file = files[0];
      if (file.type.startsWith("image/")) {
        const compressedFile = await imageCompression(file, compressOptions);

        const reader = new FileReader();
        reader.onload = () => {
          editor.insertBlocks(
            [
              {
                type: "image",
                props: { url: reader.result as string },
              } as PartialBlock,
            ],
            editor.document[0],
            "after"
          );
        };
        reader.readAsDataURL(compressedFile);
      }
    } catch (err) {
      console.error("Image upload failed:", err);
      alert("Failed to upload image. Please try a smaller file.");
    } finally {
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const handlePromptResponse = (proceed: boolean) => {
    setShowPreUploadPrompt(false);
    if (proceed) {
      inputRef.current?.click(); // Open file explorer
    }
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        className="gap-2"
        onClick={handleUploadClick}
      >
        <Upload className="h-4 w-4" />
        Upload Image
      </Button>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Cute dropdown-style prompt */}
      {showPreUploadPrompt && (
  <div className="absolute top-full mt-2 right-0 rounded-xl border shadow-xl bg-[#fdf6ff] p-4 w-80 z-50">
    <h3 className="text-base font-semibold text-gray-800 mb-2">Heads up!</h3>
    <p className="text-sm text-gray-600">
      Local images can't be exported to DOCX. <br />
      If you want to export, use an embed URL instead. <br /><br />
      Do you still want to continue?
    </p>
    <div className="flex justify-end gap-2 mt-4">
      <Button
        variant="outline"
        onClick={() => handlePromptResponse(false)}
        className="border-gray-300 text-[#cc4b4b] hover:bg-red-50"
      >
        Cancel
      </Button>
      <Button
        onClick={() => handlePromptResponse(true)}
        className="bg-[#eecbff] text-[#6b2c91] hover:bg-[#f5e1ff]"
      >
        Continue
      </Button>
    </div>
  </div>
)}

    </div>
  );
}
