import { Button } from "@/components/shared";
import { ProtocolFileCategory } from "@/types/protocol";
import { Dispatch, SetStateAction } from "react";
import { fileCategories, mapFileCategory } from "../../utils";

type Props = {
  visibleCategory: ProtocolFileCategory;
  setVisibleCategory: Dispatch<SetStateAction<ProtocolFileCategory>>;
};

const ProtocolUploadsMenu = (props: Props) => {
  return (
    <ul className="flex justify-center md:justify-start flex-wrap gap-4 pb-8">
      {fileCategories.map((category) => (
        <li key={category}>
          <Button
            className={`w-[178px] h-[110px] rounded-sm !px-8 !text-base ${
              category == props.visibleCategory ? "bg-accent_dark" : ""
            }`}
            message={mapFileCategory[category]}
            onClickAction={() => props.setVisibleCategory(category)}
          />
        </li>
      ))}
    </ul>
  );
};

export default ProtocolUploadsMenu;
