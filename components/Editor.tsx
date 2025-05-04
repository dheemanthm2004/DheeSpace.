import { useRoom, useSelf } from '@liveblocks/react/suspense';
import React, { useEffect, useState } from 'react'
import { LiveblocksYjsProvider } from '@liveblocks/yjs';
import { Button } from './ui/button';
import { SunIcon, MoonIcon } from 'lucide-react';
import * as Y from 'yjs';
import { BlockNoteView } from "@blocknote/shadcn"; 
import { BlockNoteEditor } from "@blocknote/core"; 
import { useCreateBlockNote } from "@blocknote/react"; 
import "@blocknote/core/fonts/inter.css";
import "@blocknote/shadcn/style.css";
import stringToColor from '@/lib/stringToColor';
import TranslateDocument from './TranslateDocument';
import ChatToDocument from './ChatToDocument';

type EditorProps = {
    darkMode: boolean;
    doc: Y.Doc ;
    provider: any;
};


function BlockNote({ doc, provider, darkMode }: EditorProps) {
    const userInfo = useSelf((me) => me.info);
  
    const editor: BlockNoteEditor = useCreateBlockNote({
      collaboration: {
        provider,
        fragment: doc.getXmlFragment("document-store"),
        user: {
          name: userInfo?.name,
          color: stringToColor(userInfo?.email),
        },
      },
    });
  
    return (
      <div className="relative max-w-6xl mx-auto">
        <BlockNoteView
          className="min-h-screen"
          editor={editor}
          theme={darkMode ? "dark" : "light"}
        />
      </div>
    );
  }
  


  function Editor() {
    const room = useRoom();
    const [doc, setDoc] = useState<Y.Doc | undefined>(undefined); // Explicitly set to `undefined` initially
    const [provider, setProvider] = useState<LiveblocksYjsProvider | undefined>(undefined); // Also set to undefined initially
    const [darkMode, setDarkMode] = useState(false);
  
    useEffect(() => {
      const yDoc = new Y.Doc();
      const yProvider = new LiveblocksYjsProvider(room, yDoc); 
      setDoc(yDoc);
      setProvider(yProvider);
  
      return () => {
        yProvider?.destroy();
        yDoc?.destroy();
      };
    }, [room]);
  
    const style = `hover:text-white ${
      darkMode
        ? "text-gray-300 bg-gray-700 hover:bg-gray-100 hover:text-gray-700"
        : "text-gray-700 bg-gray-200 hover:bg-gray-300 hover:text-gray-700"
    }`;
  
    return (
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-2 justify-end mb-10">
          {/* TranslateDocument AI */}
          {doc && <TranslateDocument doc={doc} />}
          {/* ChatToDocument AI */}
          {doc && <ChatToDocument doc={doc} />}
          {/* Dark Mode */}
          <Button className={style} onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <SunIcon /> : <MoonIcon />}
          </Button>
        </div>
  
        {/* Only render BlockNote when doc and provider are available */}
        {doc && provider && (
          <BlockNote doc={doc} provider={provider} darkMode={darkMode} />
        )}
      </div>
    );
  }
  
  
export default Editor