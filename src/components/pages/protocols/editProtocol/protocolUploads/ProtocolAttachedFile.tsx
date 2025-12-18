import { Button } from "@/components/shared";
import IconTrash from "@/icons/iconTrash/IconTrash";
import { FileSerialized } from "@/types/file";
import { ProtocolFileCategory } from "@/types/protocol";
import { useQueryState } from "nuqs";

type Props = {
  file: Partial<FileSerialized>;
  protocolId: string;
  fileCategory: ProtocolFileCategory;
};

const ProtocolAttachedFile = (props: Props) => {
  const [, setProtocolId] = useQueryState("protocolId");
  const [, setFileId] = useQueryState("fileId");
  const [, setCategory] = useQueryState("category");

  const printModal = async () => {
    setProtocolId(props.protocolId);
    setFileId(props.file._id!);
    setCategory(props.fileCategory);
  };

  return (
    <div className="flex gap-4 items-center">
      <div>{props.file.name}</div>
      <Button
        type="button"
        icon={<IconTrash style="h-5 w-5 bg-white" />}
        className="!w-12 !bg-red-600"
        onClickAction={printModal}
      />
    </div>
  );
};

export default ProtocolAttachedFile;
