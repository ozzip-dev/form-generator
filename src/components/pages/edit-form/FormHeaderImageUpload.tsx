import { addHeaderFileAction } from "@/actions/edit-form/addHeaderFileAction";
import { removeHeaderFileAction } from "@/actions/edit-form/removeHeaderFileAction";
import { uploadFileAction } from "@/actions/file/uploadFileAction";
import { Button, Icon, InfoIcon, UploadFileForm } from "@/components/shared";
import { useAutoLoader } from "@/context/LoaderContextProvider";
import { useToast } from "@/context/ToastProvider";
import Image from "next/image";
import { startTransition, useActionState } from "react";

type Props = {
  headerFileData?: any;
  formId?: string;
};

const FormHeaderImageUpload = ({ formId, headerFileData }: Props) => {
  const { toast } = useToast();

  const onFileUploaded = async (file: File) => {
    if (!formId) return;
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
    if (!formId) return;
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
      <p className="tetx-sm mb-2"> Obraz nad tytułem </p>
      <div className="relative mb-8">
        <div className="w-full rounded-sm border border-gray bg-bg-light">
          <UploadFileForm
            {...{
              onFileUploaded,
              acceptedExtentions: { "image/*": [] },
              text: "Dodaj obraz nad tytułem formularza",
            }}
          />
        </div>
      </div>

      {!!headerFileData && (
        <div className="relative my-4">
          <div>
            <Image
              src={`data:image/png;base64,${headerFileData}`}
              alt="form header"
              width={1200}
              height={600}
              className="h-auto w-full rounded-sm"
            />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Button
              onClickAction={handlePublishForm}
              type="button"
              variant="ghost"
              ariaLabel="Usuń obraz z tytułu"
            >
              <Icon icon="trash" size={40} className="bg-white hover:bg-gray" />
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default FormHeaderImageUpload;
