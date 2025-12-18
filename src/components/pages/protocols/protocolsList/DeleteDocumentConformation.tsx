import { removeProtocolFileAction } from "@/actions/protocol/removeProtocolFile.Action";
import { Button } from "@/components/shared";
import { useToast } from "@/hooks/useToast";
import { ProtocolFileCategory } from "@/types/protocol";
import { useQueryState } from "nuqs";
import { useState } from "react";

const DeleteDocumentConformation = () => {
  const [protocolId, setProtocolId] = useQueryState("protocolId");
  const [fileId, setFileId] = useQueryState("fileId");
  const [category, setCategory] = useQueryState("category");
  const [isLoading, setLoading] = useState(false);
  const { toast } = useToast();

  if (!protocolId || !fileId || !category) return null;

  const onRemoveFile = async () => {
    try {
      setLoading(true);
      await removeProtocolFileAction(
        protocolId,
        fileId,
        category as ProtocolFileCategory
      );
      toast({
        title: "Sukces",
        description: "Dokument usuniety",
        variant: "success",
      });
      setProtocolId(null);
      setFileId(null);
      setCategory(null);
    } catch (error) {
      toast({
        title: "Błąd",
        description: `Dokument nie został usuniety. ${error}`,
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div>Usunąć dokument?</div>
      <div className="flex gap-3">
        <Button
          message="Anuluj"
          onClickAction={() => {
            setProtocolId(null);
            setFileId(null);
            setCategory(null);
          }}
        />
        <Button
          message="Usuń"
          onClickAction={onRemoveFile}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default DeleteDocumentConformation;
