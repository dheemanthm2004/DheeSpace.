// "use client";

// import { useState, useRef, useEffect } from "react";
// import { Button } from "./ui/button";
// import { FileText, FileDigit, Download, ChevronDown } from "lucide-react";
// import { toast } from "sonner";
// import { BlockNoteEditor } from "@blocknote/core";
// import { DOCXExporter, docxDefaultSchemaMappings } from "@blocknote/xl-docx-exporter";
// import { PDFExporter, pdfDefaultSchemaMappings } from "@blocknote/xl-pdf-exporter";
// import { Packer } from "docx";
// import { pdf, Document as PDFDocument, Page as PDFPage, StyleSheet } from "@react-pdf/renderer";
// import React from "react";

// const styles = StyleSheet.create({
//   page: {
//     padding: 32,
//     fontSize: 12,
//     fontFamily: "Helvetica"
//   }
// });

// // Recursive function to add keys to all PDF elements
// function addKeysToPdfElements(element: any, prefix = "pdf-el", depth = 0): any {
//   if (Array.isArray(element)) {
//     return element.map((el, idx) => 
//       addKeysToPdfElements(el, `${prefix}-${depth}-${idx}`, depth + 1)
//     );
//   }
//   if (React.isValidElement(element)) {
//     const props = element.props as { children?: React.ReactNode };
//     let children = props.children;
//     if (children) {
//       children = addKeysToPdfElements(children, `${prefix}-child`, depth + 1);
//     }
//     return React.cloneElement(element, { 
//       key: `${prefix}-${depth}-${Math.random().toString(36).substr(2, 9)}` 
//     }, children);
//   }
//   return element;
// }

// export default function ExportDocument({ editor }: { editor: BlockNoteEditor }) {
//   const [open, setOpen] = useState(false);
//   const [loading, setLoading] = useState<"docx" | "pdf" | null>(null);
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     function handleClick(e: MouseEvent) {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
//         setOpen(false);
//       }
//     }
//     if (open) document.addEventListener("mousedown", handleClick);
//     return () => document.removeEventListener("mousedown", handleClick);
//   }, [open]);

//   const handleExport = async (type: "docx" | "pdf") => {
//     try {
//       setLoading(type);
//       if (type === "docx") {
//         const exporter = new DOCXExporter(editor.schema, docxDefaultSchemaMappings);
//         const docx = await exporter.toDocxJsDocument(editor.document);
//         const buffer = await Packer.toBuffer(docx);
        
//         const blob = new Blob([buffer], {
//           type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//         });
//         const url = URL.createObjectURL(blob);
//         const link = document.createElement("a");
//         link.href = url;
//         link.download = `document-${Date.now()}.docx`;
//         link.click();
//         URL.revokeObjectURL(url);
//         toast.success("Exported as DOCX!");
//       } else {
//         const exporter = new PDFExporter(editor.schema, pdfDefaultSchemaMappings);
//         const pdfDoc = await exporter.toReactPDFDocument(editor.document);

//         // Add keys to all elements recursively
//         const keyedPdfDoc = addKeysToPdfElements(pdfDoc);

//         const MyPDF = (
//           <PDFDocument>
//             <PDFPage key="main-page" size="A4" style={styles.page}>
//               {keyedPdfDoc}
//             </PDFPage>
//           </PDFDocument>
//         );

//         const blob = await pdf(MyPDF).toBlob();
//         const url = URL.createObjectURL(blob);
//         const link = document.createElement("a");
//         link.href = url;
//         link.download = `document-${Date.now()}.pdf`;
//         link.click();
//         URL.revokeObjectURL(url);
//         toast.success("Exported as PDF!");
//       }
//     } catch (error) {
//       toast.error(`Export failed: ${error instanceof Error ? error.message : "Unknown error"}`);
//     } finally {
//       setLoading(null);
//       setOpen(false);
//     }
//   };

//   return (
//     <div className="relative" ref={dropdownRef}>
//       <Button
//         variant="outline"
//         onClick={() => setOpen(!open)}
//         className="gap-2 px-4 py-2 border-2 border-blue-500 text-blue-700 hover:bg-blue-50 hover:border-blue-700 shadow transition-all font-semibold text-base"
//       >
//         <Download className="h-5 w-5 text-blue-500" />
//         <span>Export</span>
//         <ChevronDown className="h-4 w-4 text-blue-400" />
//       </Button>
      
//       {open && (
//         <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg flex flex-col z-50">
//           <button
//             className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50 dark:hover:bg-blue-900 text-blue-700 dark:text-blue-200 transition rounded-t-lg"
//             onClick={() => handleExport("docx")}
//             disabled={loading === "docx"}
//           >
//             <FileText className="h-5 w-5" />
//             <span>Word</span>
//           </button>
//           <button
//             className="flex items-center gap-3 px-4 py-3 hover:bg-purple-50 dark:hover:bg-purple-900 text-purple-700 dark:text-purple-200 transition rounded-b-lg"
//             onClick={() => handleExport("pdf")}
//             disabled={loading === "pdf"}
//           >
//             <FileDigit className="h-5 w-5" />
//             <span>PDF</span>
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

"use client";
import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { FileText, FileDigit, Download, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { BlockNoteEditor } from "@blocknote/core";
import { DOCXExporter, docxDefaultSchemaMappings } from "@blocknote/xl-docx-exporter";
import { Packer } from "docx";
import React from "react";

export default function ExportDocument({ editor }: { editor: BlockNoteEditor }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState<"docx" | "pdf" | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  const handleExport = async (type: "docx" | "pdf") => {
    try {
      setLoading(type);
      if (type === "docx") {
        const exporter = new DOCXExporter(editor.schema, docxDefaultSchemaMappings);
        const docx = await exporter.toDocxJsDocument(editor.document);
        const buffer = await Packer.toBuffer(docx);

        const blob = new Blob([buffer], {
          type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `document-${Date.now()}.docx`;
        link.click();
        URL.revokeObjectURL(url);
        toast.success("Exported as DOCX!");
      } else {
        const markdown = await editor.blocksToMarkdownLossy(editor.document);
        const fileName = "document";
        toast.info("Generating PDF, please wait...");

        // Setup AbortController for timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => {
          controller.abort();
        }, 20000); // 20 seconds for browserless

        let didTimeout = false;
        try {
          const res = await fetch("/api/exportPdf", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ markdown, fileName }),
            signal: controller.signal,
          });
          clearTimeout(timeoutId);
          if (!res.ok) throw new Error("PDF export failed");
          const blob = await res.blob();
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = `${fileName}-${Date.now()}.pdf`;
          link.click();
          URL.revokeObjectURL(url);
          toast.success("Exported as PDF!");
        } catch (err) {
          if (controller.signal.aborted) {
            didTimeout = true;
          }
          if (didTimeout) {
            toast.error(
              "Sorry, this PDF is taking too long to generate. Please try exporting as Word and saving as PDF. We’re working on it!"
            );
          } else {
            toast.error(
              err instanceof Error
                ? err.message
                : "Export failed. Please try again."
            );
          }
        }
      }
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Export failed. Please try again."
      );
    } finally {
      setLoading(null);
      setOpen(false);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="outline"
        onClick={() => setOpen(!open)}
        className="gap-2 px-4 py-2 border-2 border-blue-500 text-blue-700 hover:bg-blue-50 hover:border-blue-700 shadow transition-all font-semibold text-base"
      >
        <Download className="h-5 w-5 text-blue-500" />
        <span>Export</span>
        <ChevronDown className="h-4 w-4 text-blue-400" />
      </Button>
      
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg flex flex-col z-50">
          <button
            className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50 dark:hover:bg-blue-900 text-blue-700 dark:text-blue-200 transition rounded-t-lg"
            onClick={() => handleExport("docx")}
            disabled={loading === "docx"}
          >
            <FileText className="h-5 w-5" />
            <span>Word</span>
          </button>
          <button
            className="flex items-center gap-3 px-4 py-3 hover:bg-purple-50 dark:hover:bg-purple-900 text-purple-700 dark:text-purple-200 transition rounded-b-lg"
            onClick={() => handleExport("pdf")}
            disabled={loading === "pdf"}
          >
            <FileDigit className="h-5 w-5" />
            <span>PDF</span>
          </button>
        </div>
      )}
    </div>
  );
}
