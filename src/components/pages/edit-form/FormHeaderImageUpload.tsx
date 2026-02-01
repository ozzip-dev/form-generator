import { addHeaderFileAction } from "@/actions/edit-form/addHeaderFileAction";
import { removeHeaderFileAction } from "@/actions/edit-form/removeHeaderFileAction";
import { uploadFileAction } from "@/actions/file/uploadFileAction";
import { Button, Icon, InfoIcon, UploadFileForm } from "@/components/shared";
import { useAutoLoader } from "@/context/LoaderContextProvider";
import { useToast } from "@/context/ToastProvider";
import { FormSerialized } from "@/types/form";
import Image from "next/image";
import { startTransition, useActionState } from "react";

type Props = {
  headerFileData?: any;
  formId?: string
};

const FormHeaderImageUpload = ({ formId, headerFileData }: Props) => {
  const { toast } = useToast();


  const onFileUploaded = async (file: File) => {
    if (!formId) return
    try {
      const insertedId = await uploadFileAction(file);

      await addHeaderFileAction(formId, insertedId);

      toast({
        title: "Sukces",
        description: "Dodano plik",
        variant: "success",
      });
    } catch (error) {
      toast({
        title: "Błąd",
        description: `Błąd przy dodawaniu pliku. ${error}`,
        variant: "error",
      });
    }
  };

  const [_, removeFileAction, isPending] = useActionState(async () => {
    if (!formId) return
    try {
      await removeHeaderFileAction(formId);
      toast({
        title: "Sukces",
        description: "Usunięto plik",
        variant: "success",
      });
    } catch (error) {
      toast({
        title: "Błąd",
        description: "Błąd przy usuwaniu pliku.",
        variant: "error",
      });
    }
  }, null);

  const handlePublishForm = () => {
    startTransition(removeFileAction);
  };
  useAutoLoader(isPending);

  return (
    <>
      <div className="relative w-fit m-auto">
        <div className="h-[3.4rem] w-[22rem] md:w-[28rem] overflow-hidden rounded-full m-auto">
          <UploadFileForm
            {...{
              onFileUploaded,
              acceptedExtentions: { "image/*": [] },
              text: "Dodaj obraz nad tytułem formularza",
            }}
          />
        </div>

        <div className="absolute top-[0.5rem] -right-12">
          <InfoIcon>
            <div>
              Dodaj obraz nad tytułem formularza. <br />Maksymalny rozmiar: 1 MB
            </div>
          </InfoIcon>
        </div>
      </div>


      {!!headerFileData && (
        <div className="w-fit mx-auto my-4 relative">
          <div className="relative w-64 h-32 overflow-hidden">
            <Image
              src={`data:image/png;base64,${headerFileData}`}
              alt="form header"
              fill={true}
              className="object-contain"
            />
          </div>
          <div className="absolute top-0 -right-10 ">
            <Button
              onClickAction={handlePublishForm}
              type="button"
              variant="ghost"
              icon={<Icon icon="trash-can-regular-full" size={20} />}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default FormHeaderImageUpload;
