"use client";

import { uploadFileAction } from "@/actions/file/uploadFileAction";
import { Button, DataLoader } from "@/components/shared";
import ModalWrapper from "@/components/shared/ModalWrapper";
import { useToast } from "@/hooks/useToast";
import { useCallback, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import DeleteDocumentConformation from "../pages/protocols/protocolsList/DeleteDocumentConformation";
import { ProtocolFileCategory } from "@/types/protocol";

type UploadedFile = {
  id: string;
  file: File;
  uploading: boolean;
  progress: number;
  isDeleting: boolean;
  error: boolean;
  objectUrl: string;
};

type Props = {
  category?: ProtocolFileCategory;
  onFileUpload?: (fileId: string, category: ProtocolFileCategory) => void;
};

const UploadFileForm = ({ category, onFileUpload }: Props) => {
  const { toast } = useToast();
  // const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isPending, setPending] = useState<boolean>(false);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const uploadFile = useCallback(
    async (file: File) => {
      setPending(true);

      try {
        const insertedId = await uploadFileAction(file);
        onFileUpload?.(insertedId, category!);

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
      } finally {
        setPending(false);
      }
    },
    [toast, onFileUpload, category]
  );

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return;
      acceptedFiles.forEach(uploadFile);
    },
    [uploadFile]
  );

  const onDropRejected = useCallback(
    (rejectedFiles: FileRejection[]) => {
      if (rejectedFiles.length === 0) return;

      const toManyFiles = rejectedFiles.find((file) => {
        console.log("tooManyFiles", file.errors[0].code);
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
    },
    [toast]
  );

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
      <div className="flex justify-center items-center flex-col mt-4">
        {isModalOpen && (
          <ModalWrapper isOpen={isModalOpen} onClose={handlePrintModal}>
            <DeleteDocumentConformation setModalOpen={setModalOpen} />
          </ModalWrapper>
        )}

        <div
          {...getRootProps()}
          className="relative border-2  p-4 mb-8 rounded-md transition-colors w-1/2  margin-auto h-64"
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
                {/* TODO: jaki max rozmiar? Czy chcemy wiekszy? */}
                <div>Maksymalny rozmiar: 1 MB</div>
              </>
            )}
          </div>
        </div>
        {/* <div>
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
        </div> */}
      </div>
    </>
  );
};

export default UploadFileForm;
