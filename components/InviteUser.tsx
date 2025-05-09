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
import { usePathname } from "next/navigation";
import { inviteUserToDocument } from "@/actions/actions";
import { toast } from "sonner";
import { Input } from "./ui/input";
import { useUser } from "@clerk/nextjs"; // Import Clerk's hook

function InviteUser() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [email, setEmail] = useState("");
  const pathname = usePathname();
  const { isSignedIn } = useUser();

  const handleInvite = async (e: FormEvent) => {
    e.preventDefault();
    const roomId = pathname?.split("/").pop();
    if (!roomId) return;

    if (!isSignedIn) {
      toast.error("You must be signed in to send invites!");
      return;
    }

    startTransition(async () => {
      const { success, reason } = await inviteUserToDocument(roomId, email);
      if (success) {
        setIsOpen(false);
        setEmail("");
        toast.success(`Invite link sent to "${email}"!`);
      } else if (reason === "not_found") {
        toast.error("User has not signed up yet!");
      } else if (reason === "not_verified") {
        toast.error("User's email is not verified!");
      } else {
        toast.error("Failed to add user to room!");
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button asChild variant="outline">
        <DialogTrigger>Invite</DialogTrigger>
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite Users to collaborate!!</DialogTitle>
          <DialogDescription>
            Enter email of the user you want to invite
          </DialogDescription>
        </DialogHeader>
        <form className="flex gap-2" onSubmit={handleInvite}>
          <Input
            type="email"
            placeholder="Enter email"
            className="w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button type="submit" disabled={!email || isPending}>
            {isPending ? "Inviting..." : "Invite"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default InviteUser;
