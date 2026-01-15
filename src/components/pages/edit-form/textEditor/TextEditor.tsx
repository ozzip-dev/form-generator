"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import MenuBar from "./MenuBar";
import Link from "@tiptap/extension-link";
import { startTransition, useActionState, useState } from "react";
import { Button } from "@/components/shared";
import { az } from "zod/v4/locales";
import { editInputLabelAction } from "@/actions/edit-form/editFormInput/editInputLabelAction";
import { useAutoLoader } from "@/context/LoaderContextProvider";

type Props = {
  formId: string;
  inputId: string;
  description: string;
};

const TextEditor = (props: Props) => {
  const [editorContent, setEditorContent] = useState(props.description);

  console.log("description", props.description);

  console.log("editorContent", editorContent);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        autolink: false,
      }),
      Placeholder.configure({
        placeholder: "Wpisz treść...",
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
    content: editorContent,
    onUpdate: ({ editor }) => {
      setEditorContent(editor.getHTML());
    },
  });

  const [state, editDescription, isPending] = useActionState(async () => {
    await editInputLabelAction(props.formId, props.inputId, {
      description: editorContent,
    });
  }, undefined);

  const handleEditDescription = () => {
    startTransition(editDescription);
  };

  useAutoLoader(isPending);

  return (
    <>
      <MenuBar editor={editor} />
      <EditorContent
        editor={editor}
        className="textEditorLink texEditorPlaceholder text-sm"
      />
      <Button
        type="button"
        message="Zatwierdż"
        variant="primary-rounded"
        className="ml-auto"
        onClickAction={handleEditDescription}
      />
    </>
  );
};

export default TextEditor;
