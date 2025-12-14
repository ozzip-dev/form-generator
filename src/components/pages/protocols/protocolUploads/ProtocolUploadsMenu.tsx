import { Button } from "@/components/shared";
import { mapFileCategory } from "../utils";
import { ProtocolFileCategory } from "@/types/protocol";
import { Dispatch, SetStateAction, useState } from "react";

const fileCategories: ProtocolFileCategory[] = [
  "demands",
  "mediationMeetings",
  "mediationDiscrepancy",
  "negotiationMeetings",
  "negotiationDiscrepancy",
  "agreement",
  "other",
];

type Props = {
  visibleCategory: ProtocolFileCategory;
  setVisibleCategory: Dispatch<SetStateAction<ProtocolFileCategory>>;
};

const ProtocolUploadsMenu = (props: Props) => {
  return (
    <div className="flex flex-wrap gap-x-6 gap-y-2 pb-8">
      {fileCategories.map((category, idx) => (
        <Button
          key={idx}
          className={`!w-auto ${
            category == props.visibleCategory ? "!bg-slate-300 !text-black" : ""
          }`}
          message={mapFileCategory[category]}
          onClickAction={() => props.setVisibleCategory(category)}
        />
      ))}
    </div>
  );
};

export default ProtocolUploadsMenu;
