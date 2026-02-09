"use client";

import { uploadFileAction } from "@/actions/file/uploadFileAction";
import { addProtocolFileAction } from "@/actions/protocol";
import { UploadFileForm } from "@/components/shared";
import Card from "@/components/shared/Card";
import { useToast } from "@/context/ToastProvider";
import { ProtocolFileCategory, ProtocolSerialized } from "@/types/protocol";

type Props = {
  category: ProtocolFileCategory;
  protocol: ProtocolSerialized;
};

const ProtocolUploadFileForm = ({ category, protocol }: Props) => {
  const { toast } = useToast();

  const onFileUploaded = async (file: File) => {
    try {
      const insertedId = await uploadFileAction(file);

      await addProtocolFileAction({
        protocolId: protocol._id,
        fileId: insertedId,
        fileCategory: category!,
      });

      toast({
        title: "Sukces",
        description: "Dokument dodany",
        variant: "success",
      });
    } catch (error) {
      toast({
        title: "Błąd",
        description: `Dokument nie został zapisany. ${error}`,
        variant: "error",
      });
    }
  };

  return (
    <Card className="!p-0 h-[20rem] w-full md:w-2/3 mt-16 mx-auto overflow-hidden">
      <UploadFileForm
        {...{
          onFileUploaded,
          text: "Formaty: JPG, PNG, GIF, WEBP, SVG, BMP, PDF",
        }}
      />
    </Card>
  );
};

export default ProtocolUploadFileForm;
