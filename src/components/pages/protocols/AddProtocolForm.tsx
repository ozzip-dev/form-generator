// "use client";

// import { ChangeEvent, useRef } from "react";
// import { useForm } from "react-hook-form";
// import { useToast } from "@/hooks/useToast";
// import InputError from "@/components/shared/inputs/InputError";
// import {
//   uploadProtocolSchema,
//   UploadProtocolSchema,
// } from "@/lib/zodSchema/uploadProtocolSchema";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Button } from "@/components/shared";
// import { uploadFileAction } from "@/actions/protocol/uploadFileAction";

// const AddProtocolForm = () => {
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const { toast } = useToast();
//   const {
//     handleSubmit,
//     formState: { errors, isSubmitting },
//     setValue,
//   } = useForm<UploadProtocolSchema>({
//     resolver: zodResolver(uploadProtocolSchema),
//     mode: "onChange",
//   });

//   /* Need to overwrite the useForm reset fn, didn't work fine for the file type input */
//   const reset = () => {
//     if (fileInputRef.current) {
//       fileInputRef.current.value = "";
//     }
//   };

//   const uploadFile = async ({ file }: UploadProtocolSchema) => {
//     if (!file) return;

//     await uploadFileAction(file);

//     toast({
//       title: "Sukces",
//       description: "Protokół dodany",
//       variant: "success",
//     });

//     reset();
//   };

//   const onChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setValue("file", file, {
//         shouldValidate: true,
//         shouldDirty: true,
//       });
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit(uploadFile)}
//       className="flex items-center mt-8"
//     >
//       <label htmlFor="file">
//         <div className="text-lg font-black">Dodaj nowy protokół</div>
//         <input type="file" ref={fileInputRef} onChange={onChange} />
//       </label>
//       <div>
//         <Button message="Wgraj protokół" isLoading={isSubmitting} />
//       </div>

//       <InputError errorMsg={errors?.file?.message as string} />
//     </form>
//   );
// };

// export default AddProtocolForm;

"use client";

import { uploadFileAction } from "@/actions/file/uploadFileAction";
import { Button, DataLoader } from "@/components/shared";
import ModalWrapper from "@/components/shared/ModalWrapper";
import { useToast } from "@/hooks/useToast";
import IconTrash from "@/icons/iconTrash/IconTrash";
import Image from "next/image";
import { useCallback, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import DeleteDocumentConformation from "./DeleteDocumentConformation";
import IconPDF from "@/icons/iconPDF/IconPDF";

// branza
// data rozpoczecia sporu
// powod sporu moze byc kilka :  czas pracy, standardy bhp, wysokoć płac, normy pracy, inne
// nazwa związku
// nazwa zakładu
// rokowania - ladowanie plików: protokoły ze spotkań, ladowanie plików: główny protokul rozbierzności
// mediacje - ladowanie plików: protokoły ze spotkań, ladowanie plików: główny protokul rozbierzności

type UploadedFile = {
  id: string;
  file: File;
  uploading: boolean;
  progress: number;
  isDeleting: boolean;
  error: boolean;
  objectUrl: string;
};

const AddProtocolForm = () => {
  const { toast } = useToast();
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isPending, setPending] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const uploadFile = async (file: File) => {
    setPending(true);
    setFiles((prevFiles) => {
      return prevFiles.map((prevFile) => {
        return prevFile.file === file
          ? { ...prevFile, uploading: true, progress: 0 }
          : prevFile;
      });
    });


    try {
      const resp = await uploadFileAction(file);

      toast({
        title: "Sukces",
        description: "Dokument dodany",
        variant: "success",
      });
      setFiles((prev) => [
        ...prev,
        {
          id: "pppppu",
          file,
          uploading: false,
          progress: 100,
          isDeleting: false,
          error: false,
          objectUrl: URL.createObjectURL(file),
        },
      ]);
    } catch (error) {
      setPending(false);
      toast({
        title: "Błąd",
        description: `Dokument nie zostałzapisany. ${error}`,
        variant: "error",
      });
    }

    setPending(false);
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    acceptedFiles.forEach(uploadFile);
  }, []);

  const onDropRejected = useCallback((rejectedFiles: FileRejection[]) => {
    if (rejectedFiles.length === 0) return;

    const toManyFiles = rejectedFiles.find((file) => {
      console.log("toManyFiles", file.errors[0].code);
      return file.errors[0].code === "too-many-files";
    });

    const fileTooLarge = rejectedFiles.find((file) => {
      console.log("fileTooLarge", file.errors[0].code);
      return file.errors[0].code === "file-too-large";
    });

    if (toManyFiles) {
      toast({
        title: "Błąd ładowania",
        description: "Maksymalnie 3 dokument",
        variant: "error",
      });
    }
    if (fileTooLarge) {
      toast({
        title: "Błąd ładowania",
        description: "Maksymalnie 1024",
        variant: "error",
      });
    }
  }, []);

  const {
    getRootProps,
    getInputProps,
    open,
    acceptedFiles,
    fileRejections,
    isDragActive,
  } = useDropzone({
    onDrop,
    onDropRejected,
    maxFiles: 5,
    maxSize: 1024 * 1024 * 5,
    accept: { "image/*": [], "application/pdf": [] },
  });

  const handlePrintModal = () => {
    setModalOpen((prev) => !prev);
  };

  const handleDelete = () => {
    setModalOpen((prev) => !prev);
    console.log("hhhwha");
  };

  return (
    <>
      <div className="flex justify-center items-center flex-col ">
        {isModalOpen && (
          <ModalWrapper isOpen={isModalOpen} onClose={handlePrintModal}>
            <DeleteDocumentConformation setModalOpen={setModalOpen} />
          </ModalWrapper>
        )}

        <div
          {...getRootProps()}
          className="relative border-2  p-4 mb-8 rounded-md transition-colors w-1/2  margin-auto h-80"
          style={{
            borderColor: isDragActive ? "blue" : "gray",
            backgroundColor: isDragActive ? "lightblue" : "white",
          }}
        >
          {isPending && (
            <div className="absolute bg-red/50 backdrop-blur-sm w-100 inset-0 flex justify-center items-center">
              <DataLoader />
            </div>
          )}

          <input {...getInputProps()} />

          <div>
            <p>{isDragActive ? "Upuść plik w tym miejscu" : "Upuść plik"}</p>

            {!isDragActive && (
              <>
                <Button message="Wybierz z komputera" />

                <div>
                  Obsługiwane formaty: JPG, PNG, GIF, WEBP, SVG, BMP oraz PDF{" "}
                </div>
                <div>Maksymalny rozmiar: 5 MB</div>
              </>
            )}
          </div>
        </div>
        <div>
          <div className="flex p-2 gap-7">
            {files.map(({ id, objectUrl, file }, idx) => {
              console.log("file", file);

              return (
                <div key={idx} className="w-[4rem]  h-[4rem] relative">
                  <button
                    onClick={handlePrintModal}
                    disabled={isPending}
                    className="h-5 w-5 absolute -right-5"
                  >
                    <IconTrash style="size-full bg-red-500" />
                  </button>

                  {file.type === "application/pdf" ? (
                    <IconPDF style="size-full bg-red-500" />
                  ) : (
                    <Image
                      src={objectUrl}
                      alt={file.name}
                      width={100}
                      height={100}
                      placeholder="blur"
                      blurDataURL="/images/placeholder.jpg"
                      loading="lazy"
                    />
                  )}
                  <div className="truncate">{file.name}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProtocolForm;
