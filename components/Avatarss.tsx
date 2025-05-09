// "use client";
// import { useOthers, useSelf } from '@liveblocks/react/suspense'

// import React from 'react'
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
// import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

// function Avatarss() {
//     const others=useOthers();
//     const self= useSelf();
//     const all=[self,...others]
//     return (
//         <div className="flex gap-2 items-center">
//           <p className="font-light text-sm">Users currently editing this page</p>
      
//           <div className="flex -space-x-5">
//             {all.map((other, i) => (
//               <TooltipProvider key={other?.id + i}>
//                 <Tooltip>
//                   <TooltipTrigger asChild>
//                     <Avatar className="border-2 hover:z-50">
//                       <AvatarImage src={other?.info.avatar} />
//                       <AvatarFallback>{other?.info.name}</AvatarFallback>
//                     </Avatar>
//                   </TooltipTrigger>
//                   <TooltipContent>
//                     <p>{self?.id === other?.id ? 'You' : other?.info.name}</p>
//                   </TooltipContent>
//                 </Tooltip>
//               </TooltipProvider>
//             ))}
//           </div>
//         </div>
//       );
      
// }

// export default Avatarss
'use client'

import { useOthers, useSelf } from '@liveblocks/react/suspense'
import React from 'react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { usePathname } from 'next/navigation'

// Word lists for anonymous name generation
const adjectives = ["Witty", "Bouncy", "Glitchy", "Sneaky", "Curious", "Lazy", "Sparkly", "Noisy", "Zesty", "Silent"]
const nouns = ["Whale", "Penguin", "Hacker", "Pixel", "Alien", "Potato", "Ghost", "Ninja", "Bee", "Coder"]

function getAnonymousName(seed: string = "") {
  let hash = 0
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash)
  }
  const adj = adjectives[Math.abs(hash) % adjectives.length]
  const noun = nouns[Math.abs(Math.floor(hash / 10)) % nouns.length]
  return `${adj} ${noun}`
}

function Avatarss() {
  const pathname = usePathname()
  const isTemp = pathname?.startsWith('/temp/')

  const others = useOthers()
  const self = useSelf()
  const all = [self, ...others]

  return (
    <div className="flex gap-2 items-center">
      <p className="font-light text-sm">Users currently editing this page</p>

      <div className="flex -space-x-4">
        {all.map((other, i) => {
          const isSelf = self?.id === other?.id
          const seedSource = isTemp ? `${other?.connectionId}` : other?.info?.email ?? ""
          const displayName = isTemp ? getAnonymousName(seedSource) : isSelf ? "You" : other?.info?.name
          const fallback = displayName?.charAt(0).toUpperCase()

          return (
            <TooltipProvider key={other?.id + i}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="relative group cursor-pointer">
                    <Avatar className="border-2 border-white shadow-md hover:z-50 w-9 h-9 ring ring-pink-300">
                      <AvatarImage src={other?.info?.avatar} />
                      <AvatarFallback className="text-sm bg-gradient-to-tr from-fuchsia-400 to-violet-500 text-white">
                        {fallback}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p>{displayName}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )
        })}
      </div>
    </div>
  )
}

export default Avatarss
