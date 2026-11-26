"use client";

import { useAutoLoader } from "@/context/LoaderContextProvider";
import CharacterCount from "@tiptap/extension-character-count";
import Highlight from "@tiptap/extension-highlight";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useState, useTransition } from "react";
import MenuBar from "./MenuBar";

import { Mark, mergeAttributes } from "@tiptap/core";
import { Button } from "@/components/shared";

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

const MAX_CHARS = 3000;

type Props = {
  formId: string;
  inputId?: string;
  description?: string;
  editAction?: any;
  placeholder: string;
  onContentUpdate?: (content: string) => void;
};

const TextEditor = (props: Props) => {
  const [editorContent, setEditorContent] = useState(props.description ?? "");
  const [savedContent, setSavedContent] = useState(props.description ?? "");
  const [statusMessage, setStatusMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        link: {
          openOnClick: false,
          autolink: false,
          HTMLAttributes: {
            target: "_blank",
            rel: "noopener noreferrer",
          },
        },
      }),
      Small,
      Placeholder.configure({
        placeholder: props.placeholder,
      }),

      Highlight.configure({
        HTMLAttributes: {
          class: "bg-accent/20",
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
      const html = editor.getHTML();
      setEditorContent(html);
      props.onContentUpdate?.(html);
    },
  });

  const characters = editor?.storage.characterCount.characters() ?? 0;

  const handleEditDescription = () => {
    setStatusMessage("Zapis opisu");
    if (!editor) return;

    startTransition(async () => {
      if (props.inputId) {
        await props?.editAction(props.formId, props.inputId, {
          description: editorContent,
        });
        setStatusMessage("Opis zapisany");
        setSavedContent(editorContent);
      } else {
        if (!props?.editAction) return;
        await props?.editAction(props.formId, { description: editorContent });
        setStatusMessage("Opis zapisany");
        setSavedContent(editorContent);
      }
    });
  };

  useAutoLoader(isPending);
  const remaining = MAX_CHARS - characters;

  return (
    <div className="group">
      <p className="mb-1 group-focus-within:text-accent">Opis</p>
      <div className="[&_div:focus-within]:!border-accent">
        <MenuBar editor={editor} />
        <div className="textEditorTags">
          <EditorContent
            editor={editor}
            className="texEditorPlaceholder overflow-hidden rounded-b-sm bg-white text-sm [&_div:focus-within]:!border-accent [&_div]:!rounded-b-sm [&_div]:!rounded-t-none [&_div]:!border [&_div]:!border-gray"
          />
        </div>
        <div className="mt-3 flex justify-between">
          <span
            className={
              characters >= MAX_CHARS
                ? "font-semibold text-red-500"
                : "text-gray-500"
            }
          >
            {characters}/{MAX_CHARS}
          </span>
          <div role="status" aria-live="polite" className="sr-only">
            {statusMessage}
          </div>
          {editor && editorContent !== savedContent && (
            <Button
              type="button"
              onClickAction={handleEditDescription}
              className="ml-auto"
              variant="empty-accent"
              ariaLabel="Zapisz opis"
            >
              Zapisz opis
            </Button>
          )}
          <div role="status" aria-live="polite" className="sr-only">
            {statusMessage}
          </div>{" "}
          <div role="status" aria-live="polite" className="sr-only">
            {remaining > 0
              ? `Pozostało ${remaining} znaków`
              : "Osiągnięto maksymalny limit znaków"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextEditor;
