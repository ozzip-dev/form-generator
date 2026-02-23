"use client";

import { Button, DataLoader } from "@/components/shared";
import { useToast } from "@/context/ToastProvider";
import { useCallback, useTransition } from "react";
import { Accept, FileRejection, useDropzone } from "react-dropzone";
import Card from "./Card";

type Props = {
  onFileUploaded: (file: File) => Promise<void>;
  // text?: string;
  acceptedExtentions?: Accept;
};

const UploadFileForm = ({
  onFileUploaded,
  // text, // TODO: bedziemy tego uzywac?
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
    [onFileUploaded],
  );

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return;
      acceptedFiles.forEach(uploadFile);
    },
    [uploadFile],
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
          title: "Zbyt dużo plików",
          description: "Maksymalnie 3 pliki",
          variant: "error",
        });
      }
      if (fileTooLarge) {
        toast({
          title: "Plik zbyt duży",
          description: "Maksymalny rozmiar pliku to 1MB",
          variant: "error",
        });
      }
    },
    [toast],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected,
    maxFiles: 5,
    maxSize: 1024 * 1024,
    accept: acceptedExtentions,
  });

  return (
    <>
      <div
        {...getRootProps()}
        className={`group relative flex h-full w-full items-center justify-center transition-colors ${isDragActive ? "bg-accent" : "bg-transparent"}`}
      >
        {isPending && (
          <div className="bg-red/50 w-100 absolute inset-0 z-10 flex items-center justify-center backdrop-blur-sm">
            <DataLoader size="sm" />
          </div>
        )}

        <input
          {...getInputProps()}
          aria-label="Upload file: e.g. 'Contract.pdf', 'Photo.jpg'"
        />

        {isDragActive && <p> Upuść plik w tym miejscu </p>}

        {!isDragActive && (
          <Button
            type="button"
            message="Wybierz / upuść plik z komputera"
            variant="primary-rounded"
          />
        )}
      </div>
    </>
  );
};

export default UploadFileForm;
