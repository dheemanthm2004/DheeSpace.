
"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useState, useTransition } from "react";
import { Button } from "./ui/button";
import { remveUserFromDocument } from "@/actions/actions";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";
import useOwner from "@/lib/useOwner";
import { useRoom, useOthers, useSelf } from "@liveblocks/react";
import { collectionGroup, query, where } from "firebase/firestore";
import { db } from "@/firebase";
import { useCollection } from "react-firebase-hooks/firestore";

function ManageUsers() {
  const { user } = useUser();
  const isOwner = useOwner();
  const room = useRoom();

  const isTemp = room.id.startsWith("temp-");

  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const [usersInRoom] = useCollection(
    user &&
      query(collectionGroup(db, "rooms"), where("roomId", "==", room.id))
  );

  const others = useOthers();
  const self = useSelf();

  const handleDelete = (userId: string) => {
    startTransition(async () => {
      if (!userId) return;

      const { success } = await remveUserFromDocument(room.id, userId);
      if (success) {
        setIsOpen(false);
        toast.success("User removed from room successfully!");
      } else {
        toast.error("Failed to remove user from room!");
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button asChild variant="outline">
        <DialogTrigger>
          Users (
          {isTemp
            ? others.length + (self ? 1 : 0)
            : usersInRoom?.docs.length ?? 0}
          )
        </DialogTrigger>
      </Button>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Users with access</DialogTitle>
          <DialogDescription>
            List of users who have access to this document
          </DialogDescription>
        </DialogHeader>

        <hr className="my-2" />

        <div className="flex flex-col gap-2 max-h-[300px] overflow-y-auto">
          {isTemp ? (
            <>
              {[self, ...others].map((user, i) => (
                <div
                  key={user?.connectionId || i}
                  className="flex items-center justify-between"
                >
                  <p className="font-light">
                    {user?.info?.email === self?.info?.email
                      ? `You (${user?.info?.email})`
                      : user?.info?.email ?? "Anonymous"}
                  </p>
                  <div className="flex items-center gap-2">
                    <Button variant="outline">Guest</Button>
                  </div>
                </div>
              ))}
            </>
          ) : (
            usersInRoom?.docs.map((doc) => (
              <div
                key={doc.data().userId}
                className="flex items-center justify-between"
              >
                <p className="font-light">
                  {doc.data().userId ===
                  user?.emailAddresses[0]?.toString()
                    ? `You (${doc.data().userId})`
                    : doc.data().userId}
                </p>

                <div className="flex items-center gap-2">
                  <Button variant="outline">{doc.data().role}</Button>

                  {isOwner &&
                    doc.data().userId !==
                      user?.emailAddresses[0]?.toString() && (
                      <Button
                        variant="destructive"
                        onClick={() =>
                          handleDelete(doc.data().userId)
                        }
                        disabled={isPending}
                        size="sm"
                      >
                        {isPending ? "Removing…" : "X"}
                      </Button>
                    )}
                </div>
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ManageUsers;
