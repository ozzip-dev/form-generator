import { Button } from "@/components/shared";
import { ProtocolFileCategory } from "@/types/protocol";
import { Dispatch, SetStateAction } from "react";
import { fileCategories, mapFileCategory } from "../utils";

type Props = {
  visibleCategory: ProtocolFileCategory;
  setVisibleCategory: Dispatch<SetStateAction<ProtocolFileCategory>>;
};

const ProtocolUploadsMenu = (props: Props) => {
  return (
    <ul className="flex flex-wrap gap-x-6 gap-y-2 pb-8">
      {fileCategories.map((category) => (
        <li key={category}>
          <Button
            className={`!w-auto ${
              category == props.visibleCategory
                ? "!bg-slate-300 !text-black"
                : ""
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
