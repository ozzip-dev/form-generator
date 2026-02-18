"use client";

import { uploadFileAction } from "@/actions/file/uploadFileAction";
import { addProtocolFileAction } from "@/actions/protocol";
import { Card, UploadFileForm } from "@/components/shared";
import { useToast } from "@/context/ToastProvider";
import { ProtocolFileCategory, ProtocolSerialized } from "@/types/protocol";

type Props = {
  category: ProtocolFileCategory;
  protocol: ProtocolSerialized;
};

const ProtocolUploadFileForm = ({ category, protocol }: Props) => {
  const { toast } = useToast();

  const onFileUploaded = async (file: File) => {
    /* 
      To jest sprawdzane z poziomu UploadFileForm, 
      ale gdyby kiedyś max. rozmiary miały się rónić to zostawię
    */
    if (file.size > 1024 * 1024) {
      toast({
        title: "Błąd",
        description: "Plik jest zbyt duży (max 1MB)",
        variant: "error",
      });
      return;
    }

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
    <Card className="mx-auto mt-16 h-[20rem] w-full overflow-hidden !p-0 md:w-2/3">
      <UploadFileForm
        {...{
          onFileUploaded,
        }}
      />
    </Card>
  );
};

export default ProtocolUploadFileForm;
