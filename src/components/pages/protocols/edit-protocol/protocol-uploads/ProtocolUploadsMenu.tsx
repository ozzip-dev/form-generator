import { Button } from "@/components/shared";
import { ProtocolFileCategory } from "@/types/protocol";
import { Dispatch, SetStateAction, use } from "react";
import { fileCategories, mapFileCategory } from "../../utils";
import { useProtocol } from "@/context/ProtocolContext";

type Props = {
  visibleCategory: ProtocolFileCategory;
  setVisibleCategory: Dispatch<SetStateAction<ProtocolFileCategory>>;
};

const ProtocolUploadsMenu = (props: Props) => {
  const { protocolPromise } = useProtocol();
  const protocol = use(protocolPromise);

  if (!protocol) {
    return <div>Nie znaleziono protokołu</div>;
  }

  const getButtonText = (category: ProtocolFileCategory): string =>
    `${mapFileCategory[category]}\n(pliki: ${protocol.fileIds[category]?.length || 0})`;

  return (
    <ul className="flex flex-wrap justify-center gap-4 pb-8 md:justify-start">
      {fileCategories.map((category) => (
        <li key={category}>
          <Button
            className={`h-[125px] w-[178px] whitespace-pre-wrap rounded-sm !px-8 !text-base ${
              category == props.visibleCategory ? "!bg-accent_dark" : ""
            }`}
            message={getButtonText(category)}
            onClickAction={() => props.setVisibleCategory(category)}
          />
        </li>
      ))}
    </ul>
  );
};

export default ProtocolUploadsMenu;
