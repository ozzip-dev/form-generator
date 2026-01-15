"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import MenuBar from "./MenuBar";
import Link from "@tiptap/extension-link";

const TextEditor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        autolink: false,
      }),

      //   Highlight,
      //   TextAlign.configure({
      //     types: ["heading", "paragraph"],
      //   }),
    ],
    editorProps: {
      attributes: {
        class:
          "border rounded-sm focus:outline-none focus:border-accent min-h-[8rem] p-2",
      },
    },
    immediatelyRender: false,
    content: "",
  });

  //   const editor = useEditor({
  //     extensions: [StarterKit],
  //     Link.configure({
  //         openOnClick: false,
  //         autolink: false,
  //       }),
  //     content: "<p>Hello World!</p>",
  //     // Don't render immediately on the server to avoid SSR issues
  //     immediatelyRender: false,
  //     editorProps: {
  //       attributes: {
  //         class:
  //           "border rounded-sm focus:outline-none focus:border-accent min-h-[8rem] p-2",
  //       },
  //     },
  //   });

  return (
    <>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} className="textEditorLink" />
    </>
  );
};

export default TextEditor;
