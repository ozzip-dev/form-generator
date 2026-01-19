import { addHeaderFileAction } from "@/actions/edit-form/addHeaderFileAction";
import { removeHeaderFileAction } from "@/actions/edit-form/removeHeaderFileAction";
import { uploadFileAction } from "@/actions/file/uploadFileAction";
import { UploadFileForm } from "@/components/shared";
import { useAutoLoader } from "@/context/LoaderContextProvider";
import { useToast } from "@/context/ToastProvider";
import { FormSerialized } from "@/types/form";
import Image from "next/image";
import { startTransition, useActionState } from "react";

type Props = {
  form: FormSerialized;
  headerFileData?: any;
};

const FormHeaderImageUpload = ({ form, headerFileData }: Props) => {
  const { toast } = useToast();

  const onFileUploaded = async (file: File) => {
    try {
      const insertedId = await uploadFileAction(file);

      await addHeaderFileAction(form._id as string, insertedId);

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
  const [_, publishForm, isPending] = useActionState(async () => {
    try {
      await removeHeaderFileAction(form._id as string);
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
    startTransition(publishForm);
  };
  useAutoLoader(isPending);

  return (
    <div className="grid grid-cols-[1fr_250px] *:items-start">
      <UploadFileForm
        {...{
          onFileUploaded,
          acceptedExtentions: { "image/*": [] },
          text: "Załaduj plik graficzny",
        }}
      />

      {!!headerFileData && (
        <div className="relative">
          <Image
            src={`data:image/png;base64,${headerFileData}`}
            alt="form header"
            width={250}
            height={250}
            className="max-w-[250px] max-h-[250px] w-auto h-auto"
          />
          <button
            onClick={handlePublishForm}
            type="button"
            className="absolute top-0 right-4 text-xl"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
};

export default FormHeaderImageUpload;
