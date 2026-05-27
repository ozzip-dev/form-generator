"use client";

import { Editor } from "@tiptap/react";
import { useModal } from "@/context/ModalContextProvider";
import EditLinkModalContent from "./EditLinkModalContent";
import { Button, Icon } from "@/components/shared";
import { useState } from "react";

type Props = {
  editor: Editor | null;
  handleEditDescription: () => void;
  displaySaveButton?: boolean;
};

const MenuBar = ({
  editor,
  handleEditDescription,
  displaySaveButton = true,
}: Props) => {
  const { openModal } = useModal();
  const [_, forceUpdate] = useState(false);

  const handleClick = (action: () => void) => {
    action();
    forceUpdate((prev) => !prev);
  };

  if (!editor) return null;

  const editorState = {
    heading3: editor.isActive("heading", { level: 3 }),
    paragraph: editor.isActive("paragraph"),
    bold: editor.isActive("bold"),
    italic: editor.isActive("italic"),
    highlight: editor.isActive("highlight"),
    smallText: editor.isActive("small"),
  };

  const createBtnsData = [
    {
      onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      btnName: "heading3",
      icon: "heading",
      ariaLabel: "Nagłówek",
    },
    {
      onClick: () => editor.chain().focus().setParagraph().run(),
      btnName: "paragraph",
      icon: "text-height",
      ariaLabel: "Paragraf",
    },
    {
      onClick: () =>
        handleClick(() => editor.chain().focus().toggleSmall().run()),
      btnName: "smallText",
      icon: "t-solid",
      ariaLabel: "Mały tekst",
    },
    {
      onClick: () =>
        handleClick(() => editor.chain().focus().toggleBold().run()),
      btnName: "bold",
      icon: "bold",
      ariaLabel: "Pogrubienie",
    },
    {
      onClick: () =>
        handleClick(() => editor.chain().focus().toggleItalic().run()),
      btnName: "italic",
      icon: "italic",
      ariaLabel: "Kursywa",
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
      ariaLabel: "Uwtórz link",
    },
    {
      onClick: () =>
        handleClick(() => {
          editor.chain().focus();

          if (editor.isActive("highlight")) {
            editor.chain().unsetHighlight().run();
          } else {
            editor.chain().setHighlight({ color: "var(--color-accent)" }).run();
          }
        }),
      btnName: "highlight",
      icon: "highlighter",
      ariaLabel: "Podkreślenie",
    },
    {
      onClick: () => editor.chain().focus().unsetAllMarks().clearNodes().run(),
      btnName: "clear-formatting",
      icon: "text-slash",
      ariaLabel: "Usuń formatowanie",
    },
  ];

  return (
    <div className="control-group flex items-center">
      <div className="button-group flex gap-2">
        {createBtnsData.map(({ onClick, btnName, icon, ariaLabel }, idx) => (
          <Button
            key={idx}
            type="button"
            onClickAction={onClick}
            className="p-1 px-2"
            icon={
              <Icon
                className={`${editorState[btnName as keyof typeof editorState] ? "bg-font_dark" : "bg-font_light"}`}
                icon={icon as string}
                size={15}
              />
            }
            ariaLabel={ariaLabel}
            variant="ghost"
          />
        ))}
      </div>
    </div>
  );
};

export default MenuBar;
