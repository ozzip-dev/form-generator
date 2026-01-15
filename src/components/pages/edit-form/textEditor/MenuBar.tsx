// "use client";

// import { Editor } from "@tiptap/react";
// import { useEditorState } from "@tiptap/react";
// import { useState } from "react";

// type EditorKey = "bold" | "italic" | "link" | "heading3" | "paragraph";

// const createBtnsData = (editor: Editor) => {
//   return [
//     {
//       onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
//       btnName: "heading3" as EditorKey,
//     },
//     {
//       onClick: () => editor.chain().focus().setParagraph().run(),
//       btnName: "paragraph" as EditorKey,
//     },
//     {
//       onClick: () => editor.chain().focus().toggleBold().run(),
//       btnName: "bold" as EditorKey,
//     },
//     {
//       onClick: () => editor.chain().focus().toggleItalic().run(),
//       btnName: "italic" as EditorKey,
//     },

//     {
//       onClick: () => {
//         const url = window.prompt("Wstaw link");
//         if (!url) return;

//         editor
//           .chain()
//           .focus()
//           .extendMarkRange("link")
//           .setLink({ href: url })
//           .run();
//       },
//       btnName: "link" as EditorKey,
//     },
//     {
//       onClick: () => editor.chain().focus().unsetLink().run(),
//       btnName: "unsetLink" as EditorKey,
//     },
//   ];
// };

// type Props = {
//   editor: Editor | null;
// };

// const MenuBar = ({ editor }: Props) => {
//   const [showLinkModal, setShowLinkModal] = useState(false);
//   const [linkInput, setLinkInput] = useState("");

//   if (!editor) return null;

//   const editorState = useEditorState({
//     editor,
//     selector: ({ editor }) => ({
//       heading3: editor.isActive("heading", { level: 3 }),
//       paragraph: editor.isActive("paragraph"),
//       bold: editor.isActive("bold"),
//       italic: editor.isActive("italic"),
//       link: editor.isActive("link"),
//       unsetLink: editor.isActive("unsetLink"),
//     }),
//   });

//   const insertLink = (url: string) => {
//     editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
//   };

//   return (
//     <div className="control-group">
//       <div className="button-group flex gap-2">
//         {createBtnsData(editor).map(({ onClick, btnName }, idx) => {
//           return (
//             <button
//               key={idx}
//               type="button"
//               onClick={onClick}
//               className={editorState[btnName] ? "bg-accent_light" : ""}
//             >
//               {btnName}
//             </button>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default MenuBar;

"use client";

import { useState } from "react";
import { Editor } from "@tiptap/react";
import { useModal } from "@/context/ModalContextProvider";
import EditLinkModalContent from "./EditLinkModalContent";

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

  const insertLink = (url: string) => {
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  const createBtnsData = [
    {
      onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      btnName: "heading3",
    },
    {
      onClick: () => editor.chain().focus().setParagraph().run(),
      btnName: "paragraph",
    },
    {
      onClick: () => editor.chain().focus().toggleBold().run(),
      btnName: "bold",
    },
    {
      onClick: () => editor.chain().focus().toggleItalic().run(),
      btnName: "italic",
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
    },
    {
      onClick: () => editor.chain().focus().unsetLink().run(),
      btnName: "unsetLink",
    },
  ];

  return (
    <div className="control-group">
      <div className="button-group flex gap-2">
        {createBtnsData.map(({ onClick, btnName }, idx) => (
          <button
            key={idx}
            type="button"
            onClick={onClick}
            className={`px-3 py-1 rounded border ${
              editorState[btnName as keyof typeof editorState]
                ? "bg-accent text-white"
                : ""
            }`}
          >
            {btnName}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MenuBar;
