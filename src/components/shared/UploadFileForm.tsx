"use client";

import { Button, DataLoader } from "@/components/shared";
import { useToast } from "@/context/ToastProvider";
import { useCallback, useTransition } from "react";
import { Accept, FileRejection, useDropzone } from "react-dropzone";
import Card from "./Card";

type Props = {
  onFileUploaded: (file: File) => Promise<void>;
  text: string;
  acceptedExtentions?: Accept;
};

const UploadFileForm = ({
  onFileUploaded,
  text,
  acceptedExtentions = { "image/*": [], "application/pdf": [] },
}: Props) => {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const uploadFile = useCallback(
    async (file: File) => {
      startTransition(async () => {
        onFileUploaded(file);
      });
    },
    [onFileUploaded]
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
        return file.errors[0].code === "too-many-files";
      });

      const fileTooLarge = rejectedFiles.find((file) => {
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

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected,
    maxFiles: 5,
    maxSize: 1024 * 1024 * 5,
    accept: acceptedExtentions,
  });

  return (
    <div className="flex justify-center items-center flex-col">
      <Card className="!p-0 w-full md:w-2/3 overflow-hidden">
        <div
          {...getRootProps()}
          className={`
              relative h-[20rem] transition-colors flex justify-center items-center
              ${isDragActive ? "bg-accent" : "bg-transparent"}
              *:flex *:flex-col *:items-center *:gap-8 *:text-center
            `}
        >
          {isPending && (
            <div className="absolute bg-red/50 backdrop-blur-sm w-100 inset-0 flex justify-center items-center z-10">
              <DataLoader />
            </div>
          )}

          <input {...getInputProps()} />

          <div>
            <p className="font-bold">
              {isDragActive ? "Upuść plik w tym miejscu" : "Upuść plik"}
            </p>

            {!isDragActive && (
              <>
                <Button
                  type="button"
                  message="Wybierz z komputera"
                  variant="primary-rounded"
                />

                {/* TODO: jaki max rozmiar? Czy chcemy wiekszy? */}
                <div className="text-sm">
                  <div>{text} </div>
                  <div>Maksymalny rozmiar: 1 MB</div>
                </div>
              </>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default UploadFileForm;
