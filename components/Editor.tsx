
// "use client";
// import { useRoom, useSelf } from '@liveblocks/react/suspense';
// import React, { useEffect, useState } from 'react';
// import { LiveblocksYjsProvider } from '@liveblocks/yjs';
// import { Button } from './ui/button';
// import { SunIcon, MoonIcon } from 'lucide-react';
// import * as Y from 'yjs';
// import { BlockNoteView } from "@blocknote/shadcn";
// import { BlockNoteEditor } from "@blocknote/core";
// import { useCreateBlockNote } from "@blocknote/react";
// import "@blocknote/core/fonts/inter.css";
// import "@blocknote/shadcn/style.css";
// import stringToColor from '@/lib/stringToColor';
// import TranslateDocument from './TranslateDocument';
// import ChatToDocument from './ChatToDocument';
// import ExportDocument from './ExportDocument';
// import UploadButton from './UploadButton';

// type EditorProps = {
//   darkMode: boolean;
//   doc: Y.Doc;
//   provider: LiveblocksYjsProvider;
//   setEditorInstance: (editor: BlockNoteEditor) => void;
// };

// function BlockNote({ doc, provider, darkMode, setEditorInstance }: EditorProps) {
//   const userInfo = useSelf((me) => me.info);

//   const editor: BlockNoteEditor = useCreateBlockNote({
//     collaboration: {
//       provider,
//       fragment: doc.getXmlFragment("blocknote"),
//       user: {
//         name: userInfo?.name || "Anonymous",
//         color: stringToColor(userInfo?.email || "default@email.com"),
//       },
//     },
//   });

//   useEffect(() => {
//     setEditorInstance(editor);
//   }, [editor, setEditorInstance]);

//   return (
//     <div className="relative w-full max-w-6xl mx-auto">
//       <BlockNoteView
//         className="min-h-screen"
//         editor={editor}
//         theme={darkMode ? "dark" : "light"}
//       />
//     </div>
//   );
// }

// function Editor() {
//   const room = useRoom();
//   const [doc, setDoc] = useState<Y.Doc>();
//   const [provider, setProvider] = useState<LiveblocksYjsProvider>();
//   const [darkMode, setDarkMode] = useState(false);
//   const [editorInstance, setEditorInstance] = useState<BlockNoteEditor>();

//   useEffect(() => {
//     const yDoc = new Y.Doc();
//     const yProvider = new LiveblocksYjsProvider(room, yDoc);
//     setDoc(yDoc);
//     setProvider(yProvider);

//     return () => {
//       yProvider?.destroy();
//       yDoc?.destroy();
//     };
//   }, [room]);

//   const style = `hover:text-white ${
//     darkMode
//       ? "text-gray-300 bg-gray-700 hover:bg-gray-100 hover:text-gray-700"
//       : "text-gray-700 bg-gray-200 hover:bg-gray-300 hover:text-gray-700"
//   }`;

//   return (
//     <>
//       <div className="w-full max-w-6xl mx-auto px-2 sm:px-0">
//         <div className="flex flex-wrap items-center gap-2 justify-end mb-6">
//           {editorInstance && <TranslateDocument editor={editorInstance} />}
//           {editorInstance && <ChatToDocument editor={editorInstance} />}
//           {editorInstance && <UploadButton editor={editorInstance} />}
//           {editorInstance && <ExportDocument editor={editorInstance} />}
//           <Button className={style} onClick={() => setDarkMode(!darkMode)}>
//             {darkMode ? <SunIcon /> : <MoonIcon />}
//           </Button>
//         </div>
//         {doc && provider && (
//           <BlockNote
//             doc={doc}
//             provider={provider}
//             darkMode={darkMode}
//             setEditorInstance={setEditorInstance}
//           />
//         )}
//       </div>
//     </>
//   );
// }

// export default Editor;
"use client";
import { useRoom, useSelf } from '@liveblocks/react/suspense';
import React, { useEffect, useState } from 'react';
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
import ExportDocument from './ExportDocument';
import UploadButton from './UploadButton';

type EditorProps = {
  darkMode: boolean;
  doc: Y.Doc;
  provider: LiveblocksYjsProvider;
  setEditorInstance: (editor: BlockNoteEditor) => void;
};

function BlockNote({ doc, provider, darkMode, setEditorInstance }: EditorProps) {
  const userInfo = useSelf((me) => me.info);

  const editor: BlockNoteEditor = useCreateBlockNote({
    collaboration: {
      provider,
      fragment: doc.getXmlFragment("blocknote"),
      user: {
        name: userInfo?.name || "Anonymous",
        color: stringToColor(userInfo?.email || "default@email.com"),
      },
    },
  });

  useEffect(() => {
    setEditorInstance(editor);
  }, [editor, setEditorInstance]);

  return (
    <div className="relative w-full max-w-6xl mx-auto">
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
  const [doc, setDoc] = useState<Y.Doc>();
  const [provider, setProvider] = useState<LiveblocksYjsProvider>();
  const [darkMode, setDarkMode] = useState(false);
  const [editorInstance, setEditorInstance] = useState<BlockNoteEditor>();

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
    <>
      <div className="w-full max-w-6xl mx-auto px-2 sm:px-0">
        <div className="flex flex-wrap items-center gap-2 justify-end mb-6">
          {editorInstance && <TranslateDocument editor={editorInstance} />}
          {editorInstance && <ChatToDocument editor={editorInstance} />}
          {editorInstance && <UploadButton editor={editorInstance} />}
          {editorInstance && <ExportDocument editor={editorInstance} />}
          <Button className={style} onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <SunIcon /> : <MoonIcon />}
          </Button>
        </div>
        {doc && provider && (
          <BlockNote
            doc={doc}
            provider={provider}
            darkMode={darkMode}
            setEditorInstance={setEditorInstance}
          />
        )}
      </div>
    </>
  );
}

export default Editor;
