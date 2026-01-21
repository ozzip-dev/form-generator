import { addHeaderFileAction } from "@/actions/edit-form/addHeaderFileAction";
import { removeHeaderFileAction } from "@/actions/edit-form/removeHeaderFileAction";
import { uploadFileAction } from "@/actions/file/uploadFileAction";
import { Button, Icon, UploadFileForm } from "@/components/shared";
import Card from "@/components/shared/Card";
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
    <div className="">
      <div className="h-[3.4rem] !rounded-sm border bg-white">
        <UploadFileForm
          {...{
            onFileUploaded,
            acceptedExtentions: { "image/*": [] },
            text: "Wstaw grafikę na szczycie formularza",
          }}
        />
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
    </div>
  );
};

export default FormHeaderImageUpload;
