"use client";

import { editInputLabelAction } from "@/actions/edit-form/editFormInput/editInputLabelAction";
import { Button } from "@/components/shared";
import { useAutoLoader } from "@/context/LoaderContextProvider";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { startTransition, useActionState, useState } from "react";
import MenuBar from "./MenuBar";
import CharacterCount from "@tiptap/extension-character-count";
import Highlight from "@tiptap/extension-highlight";

const MAX_CHARS = 2000;

type Props = {
  formId: string;
  inputId: string;
  description: string;
  printDescriptionInput: () => void;
  
};

const TextEditor = (props: Props) => {
  const [editorContent, setEditorContent] = useState(props.description);

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
          class: "my-custom-class",
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

  const [_, editDescription, isPending] = useActionState(async () => {
    await editInputLabelAction(props.formId, props.inputId, {
      description: editorContent,
    });
    props.printDescriptionInput();
  }, undefined);

  const characters = editor?.storage.characterCount.characters() ?? 0;

  const handleEditDescription = () => {
    startTransition(() => {
      editDescription();
    });
  };

  useAutoLoader(isPending);

  return (
    <>
      <MenuBar editor={editor} handleEditDescription = {handleEditDescription} />
      <div
        className="
        [&_h3]:text-lg
        [&_a]:text-accent_dark
        [&_a]:underline"
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
