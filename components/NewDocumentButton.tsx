
'use client'
import React, { useTransition } from 'react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
import { createNewDocument } from '@/actions/actions'
import { useUser, useClerk } from '@clerk/nextjs'

function NewDocumentButton() {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const { isSignedIn } = useUser()
  const { openSignIn } = useClerk()

  const handleCreateNewDocument = () => {
    if (!isSignedIn) {
      openSignIn() // 👈 This opens the Clerk sign-in modal immediately
      return
    }

    startTransition(async () => {
      const { docId } = await createNewDocument()
      router.push(`/doc/${docId}`)
    })
  }

  return (
    <Button onClick={handleCreateNewDocument} disabled={isPending}>
      {isPending ? 'Creating...' : 'New Document'}
    </Button>
  )
}

export default NewDocumentButton
