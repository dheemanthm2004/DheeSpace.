'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from './ui/button'
import { Input } from './ui/input'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from './ui/dialog'

function TemporaryDocumentButton() {
  const [slug, setSlug] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const router = useRouter()

  const handleCreate = () => {
    if (!slug.trim()) return

    setIsCreating(true)
    router.push(`/temp/${slug.trim()}`)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Temporary Share</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Temporary Document</DialogTitle>
          <DialogDescription>
            Anyone with the link can view & collaborate. No login required.
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-2 pt-4">
          <Input
            placeholder="Enter custom name (e.g. my-ideas)"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
          />
          <Button
            onClick={handleCreate}
            disabled={!slug.trim() || isCreating}
          >
            {isCreating ? 'Let’s Go 🚀' : 'Go!'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default TemporaryDocumentButton
