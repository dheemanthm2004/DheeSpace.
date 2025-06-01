
"use client";

import React, { FormEvent, useEffect, useState, useTransition } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useDocumentData } from "react-firebase-hooks/firestore";
import Editor from "./Editor";
import useOwner from "@/lib/useOwner";
import DeleteDocument from "./DeleteDocument";
import InviteUser from "./InviteUser";
import ManageUsers from "./ManageUsers";
import Avatarss from "./Avatarss";
import { toast } from "sonner";

function Document({ id, isTemporary = false }: { id: string; isTemporary?: boolean }) {
  const [data] = useDocumentData(doc(db, "documents", id));
  const [input, setInput] = useState("");
  const [isUpdating, startTransition] = useTransition();
  const isOwner = isTemporary ? true : useOwner();

  useEffect(() => {
    if (isTemporary) {
      const ref = doc(db, "documents", id);
      setDoc(
        ref,
        {
          title: "Temporary Document",
          createdAt: new Date(),
          expiresAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        },
        { merge: true }
      );
    }
  }, [id, isTemporary]);

  useEffect(() => {
    if (data) setInput(data.title);
  }, [data]);

  const updateTitle = (e: FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      startTransition(async () => {
        await updateDoc(doc(db, "documents", id), {
          title: input,
        });
      });
    }
  };

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    toast.success("Link copied to clipboard! 🚀");
  };

  return (
    <div className="flex-1 h-full bg-white p-2 sm:p-5 rounded-xl shadow-md min-h-screen relative">
      {/* Centered Temporary Document Badge with Tooltip */}
      {isTemporary && (
  <div
    className="fixed top-12 left-1/2 transform -translate-x-1/2 flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 text-purple-900 text-xs font-semibold shadow-sm select-none z-50"
    aria-label="Temporary Document Info"
  >
    <span>Temporary Document</span>

    {/* Info Icon with Tooltip */}
    <div className="relative group">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4 text-purple-700 cursor-pointer"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13 16h-1v-4h-1m1-4h.01M12 19a7 7 0 110-14 7 7 0 010 14z"
        />
      </svg>

      {/* Tooltip Box - appears below icon */}
      <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-56 rounded-md bg-purple-800 text-white text-xs px-2 py-1 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity z-50">
        🚧 Public & Temporary: anyone with this link can view and edit.
      </div>
    </div>
  </div>
)}


      <div className="flex flex-col w-full max-w-6xl mx-auto pb-5 px-2 sm:px-5">
        {/* Shareable link + copy button for temporary docs */}
        {isTemporary && (
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mb-5 mt-14">
            <Input
              readOnly
              value={shareUrl}
              className="text-sm bg-gray-50 cursor-text rounded-md"
            />
            <Button
              variant="outline"
              onClick={handleCopy}
              className="w-full sm:w-auto font-medium"
            >
              Copy Link 🔗
            </Button>
          </div>
        )}

        {/* Title input for permanent documents */}
        {!isTemporary && (
          <form
            className="flex flex-col sm:flex-row gap-2 sm:gap-2 mb-5"
            onSubmit={updateTitle}
          >
            <Input value={input} onChange={(e) => setInput(e.target.value)} />
            <Button disabled={isUpdating} type="submit">
              {isUpdating ? "Updating..." : "Update"}
            </Button>

            {isOwner && (
              <>
                <InviteUser />
                <DeleteDocument />
              </>
            )}
          </form>
        )}
      </div>

      <div className="flex flex-col sm:flex-row w-full max-w-6xl mx-auto justify-between items-center mb-5 px-2 sm:px-5 gap-2 sm:gap-0">
        <ManageUsers />
        <Avatarss />
      </div>

      <hr className="pb-10" />

      <Editor />
    </div>
  );
}

export default Document;

