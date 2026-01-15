"use client";

import { Editor } from "@tiptap/react";
import { useModal } from "@/context/ModalContextProvider";
import EditLinkModalContent from "./EditLinkModalContent";
import { Button, Icon } from "@/components/shared";

type Props = {
  editor: Editor | null;
};

const MenuBar = ({ editor }: Props) => {
  const { openModal } = useModal();

  if (!editor) return null;

  const editorState = {
    heading3: editor.isActive("heading", { level: 3 }),
    paragraph: editor.isActive("paragraph"),
    bold: editor.isActive("bold"),
    italic: editor.isActive("italic"),
    link: editor.isActive("link"),
  };

  const createBtnsData = [
    {
      onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      btnName: "heading3",
      icon: "heading",
    },
    {
      onClick: () => editor.chain().focus().setParagraph().run(),
      btnName: "paragraph",
      icon: "paragraph",
    },
    {
      onClick: () => editor.chain().focus().toggleBold().run(),
      btnName: "bold",
      icon: "bold",
    },
    {
      onClick: () => editor.chain().focus().toggleItalic().run(),
      btnName: "italic",
      icon: "italic",
    },
    {
      onClick: () => {
        if (!editor.state.selection.empty) {
          openModal({
            header: "Wstaw link",
            component: ({ close }) => (
              <EditLinkModalContent onClose={close} editor={editor} />
            ),
          });
        } else {
          return;
        }
      },
      btnName: "link",
      icon: "link",
    },
    {
      onClick: () => editor.chain().focus().unsetLink().run(),
      btnName: "un-link",
      icon: "un-link",
    },
  ];

  return (
    <div className="control-group">
      <div className="button-group flex gap-2">
        {createBtnsData.map(({ onClick, btnName, icon }, idx) => (
          <Button
            key={idx}
            type="button"
            onClickAction={onClick}
            className={`px-3 py-1  ${
              editorState[btnName as keyof typeof editorState]
                ? "text-font_dark"
                : ""
            }`}
            icon={
              <Icon
                color={`${
                  editorState[btnName as keyof typeof editorState]
                    ? "var( --color-font_dark)"
                    : "var(--color-font_light)"
                }`}
                icon={icon as string}
                size={15}
              />
            }
            variant="ghost"
          />
        ))}
      </div>
    </div>
  );
};

export default MenuBar;
