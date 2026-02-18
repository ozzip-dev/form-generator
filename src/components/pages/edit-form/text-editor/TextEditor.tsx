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
import Paragraph from "@tiptap/extension-paragraph";

import { Mark, mergeAttributes } from "@tiptap/core";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    small: {
      toggleSmall: () => ReturnType;
    };
  }
}

export const Small = Mark.create({
  name: "small",

  parseHTML() {
    return [{ tag: "small" }];
  },

  renderHTML({ HTMLAttributes }) {
    return ["small", mergeAttributes(HTMLAttributes), 0];
  },

  addCommands() {
    return {
      toggleSmall:
        () =>
        ({ commands }) => {
          return commands.toggleMark(this.name);
        },
    };
  },
});

const MAX_CHARS = 2000;

type Props = {
  formId: string;
  inputId?: string;
  description?: string;
  printDescriptionInput?: () => void;
  editAction?: any;
  placeholder: string;
};

const TextEditor = (props: Props) => {
  const [editorContent, setEditorContent] = useState(props.description ?? "");
  const [isPending, startTransition] = useTransition();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Small,
      Link.configure({
        openOnClick: false,
        autolink: false,
      }),
      Placeholder.configure({
        placeholder: props.placeholder,
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
          "border rounded-sm focus:outline-none focus:border-accent min-h-[6rem] p-2  overflow-hidden break-words",
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
      return;
    }

    startTransition(async () => {
      if (props.inputId) {
        await props?.editAction(props.formId, props.inputId, {
          description: editorContent,
        });
      } else {
        if (!props?.editAction) return;
        await props?.editAction(props.formId, { description: editorContent });
      }

      props.printDescriptionInput && props.printDescriptionInput();
    });
  };

  useAutoLoader(isPending);

  return (
    <div className="">
      <MenuBar editor={editor} handleEditDescription={handleEditDescription} />
      <div className="textEditorTags">
        <EditorContent
          editor={editor}
          className="texEditorPlaceholder bg-white text-sm"
        />
      </div>
      <div className="flex justify-end text-xs">
        <span
          className={
            characters >= MAX_CHARS
              ? "font-semibold text-red-500"
              : "text-gray-500"
          }
        >
          {characters}/{MAX_CHARS}
        </span>
      </div>
    </div>
  );
};

export default TextEditor;
