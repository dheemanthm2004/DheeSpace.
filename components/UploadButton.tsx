"use client";
import { Button } from "./ui/button";
import { Upload } from "lucide-react";
import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import imageCompression from "browser-image-compression";
import React, { useRef } from "react";

export default function UploadButton({ editor }: { editor: BlockNoteEditor }) {
  const inputRef = useRef<HTMLInputElement>(null);

  // Compression settings
  const compressOptions = {
    maxSizeMB: 0.5,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };

  const handleUploadClick = () => inputRef.current?.click();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    try {
      for (const file of Array.from(files)) {
        if (file.type.startsWith("image/")) {
          // Compress image before processing
          const compressedFile = await imageCompression(file, compressOptions);
          
          const reader = new FileReader();
          reader.onload = () => {
            editor.insertBlocks(
              [{
                type: "image",
                props: { url: reader.result as string }
              } as PartialBlock],
              editor.document[0],
              "after"
            );
          };
          reader.readAsDataURL(compressedFile);
        }
      }
    } catch (err) {
      console.error("Image upload failed:", err);
      alert("Failed to upload image. Please try a smaller file.");
    } finally {
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <>
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
    </>
  );
}
