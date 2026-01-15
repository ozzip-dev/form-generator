"use client";

import { Editor } from "@tiptap/react";
import { useEditorState } from "@tiptap/react";

type EditorKey = "bold" | "italic" | "paragraph" | "link";

const createBtnsData = (editor: Editor) => {
  return [
    {
      onClick: () => editor.chain().focus().toggleBold().run(),
      btnName: "bold" as EditorKey,
    },
    {
      onClick: () => editor.chain().focus().toggleItalic().run(),
      btnName: "italic" as EditorKey,
    },
    {
      onClick: () => editor.chain().focus().setParagraph().run(),
      btnName: "paragraph" as EditorKey,
    },
    {
      onClick: () => {
        const url = window.prompt("Wstaw link");
        if (!url) return;

        editor
          .chain()
          .focus()
          .extendMarkRange("link")
          .setLink({ href: url })
          .run();
      },
      btnName: "link" as EditorKey,
    },
    {
      onClick: () => editor.chain().focus().unsetLink().run(),
      btnName: "unsetLink" as EditorKey,
    },
  ];
};

type Props = {
  editor: Editor | null;
};

const MenuBar = ({ editor }: Props) => {
  if (!editor) return null;

  const editorState = useEditorState({
    editor,
    selector: ({ editor }) => ({
      bold: editor.isActive("bold"),
      italic: editor.isActive("italic"),
      paragraph: editor.isActive("paragraph"),
      link: editor.isActive("link"),
      unsetLink: editor.isActive("unsetLink"),
    }),
  });

  return (
    <div className="control-group">
      <div className="button-group flex gap-2">
        {createBtnsData(editor).map(({ onClick, btnName }, idx) => {
          return (
            <button
              key={idx}
              type="button"
              onClick={onClick}
              className={editorState[btnName] ? "bg-accent_light" : ""}
            >
              {btnName}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MenuBar;
