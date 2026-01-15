import { Button, InputFields } from "@/components/shared";
import { Editor } from "@tiptap/react";
import { useState } from "react";
import { useForm } from "react-hook-form";

const dataLinkInput = [
  {
    name: "link",
    type: "text",
  },
];

type Props = {
  onClose: () => void;
  editor: Editor;
};

const EditLinkModalContent = (props: Props) => {
  const [linkInput, setLinkInput] = useState("");
  const { register } = useForm();

  const onLinkChange = (_: unknown, value: string) => {
    setLinkInput(value);
  };

  const insertLink = () => {
    props.editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: linkInput })
      .run();
  };

  return (
    <div>
      <InputFields
        inputsData={dataLinkInput}
        register={register}
        onChange={onLinkChange}
      />

      <div className="flex justify-center gap-8">
        <Button
          message="Anuluj"
          onClickAction={props.onClose}
          className="!bg-white !text-accent border border-accent"
        />

        <Button
          message="Wstaw"
          onClickAction={() => {
            insertLink();
            props.onClose();
          }}
          className="px-3 py-1 rounded bg-accent text-white"
        />
      </div>
    </div>
  );
};

export default EditLinkModalContent;
