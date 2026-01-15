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

type Props = {
  formId: string;
  inputId: string;
  description: string;
  printDescriptionInput: () => void;
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
    props.printDescriptionInput();
  }, undefined);

  const handleEditDescription = () => {
    startTransition(() => {
      editDescription();
    });
  };

  useAutoLoader(isPending);

  return (
    <>
      <MenuBar editor={editor} />
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
