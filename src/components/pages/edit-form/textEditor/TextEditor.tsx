"use client";

import { useAutoLoader } from "@/context/LoaderContextProvider";
import CharacterCount from "@tiptap/extension-character-count";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useState, useTransition } from "react";
import MenuBar from "./MenuBar";

const MAX_CHARS = 2000;

type Props = {
  formId: string;
  inputId?: string;
  description?: string;
  printDescriptionInput?: () => void;
  editAction?: any;

};

const TextEditor = (props: Props) => {
  const [editorContent, setEditorContent] = useState(props.description ?? "");
  const [isPending, startTransition] = useTransition();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        autolink: false,
      }),
      Placeholder.configure({
        placeholder: "Edytuj opis pod pytaniem",
      }),

      Highlight.configure({
        HTMLAttributes: {
          class: "bg-accent",
        },
      }),
      CharacterCount.configure({
        limit: MAX_CHARS,
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "border rounded-sm focus:outline-none focus:border-accent min-h-[3rem] p-2",
      },
    },

    immediatelyRender: false,
    content: editorContent,

    onUpdate: ({ editor }) => {
      setEditorContent(editor.getHTML());
    },
  });





  const characters = editor?.storage.characterCount.characters() ?? 0;

  const handleEditDescription = () => {
    if (!editor) return;

    const text = editor.getText().trim();

    if (text.length === 0) {
      return
    }

    startTransition(async () => {


      if (props.inputId) {
        await props?.editAction(
          props.formId,
          props.inputId,
          { description: editorContent }
        );
      } else {

        if (!props?.editAction) return
        await props?.editAction(
          props.formId,
          { description: editorContent }
        );
      }

      props.printDescriptionInput && props.printDescriptionInput();
    },
    );
  };

  useAutoLoader(isPending);

  return (
    <>
      <MenuBar editor={editor} handleEditDescription={handleEditDescription} />
      <div
        className="textEditorTags"
      >
        <EditorContent
          editor={editor}
          className="texEditorPlaceholder text-sm bg-white"
        />
      </div>
      <div className="flex justify-end text-xs">
        <span
          className={
            characters >= MAX_CHARS
              ? "text-red-500 font-semibold"
              : "text-gray-500"
          }
        >
          {characters}/{MAX_CHARS}
        </span>
      </div>

    </>
  );
};

export default TextEditor;
