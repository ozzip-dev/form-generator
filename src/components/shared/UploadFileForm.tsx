"use client";

import { DataLoader } from "@/components/shared";
import { useToast } from "@/context/ToastProvider";
import { useCallback, useTransition } from "react";
import { Accept, FileRejection, useDropzone } from "react-dropzone";
import { MAX_FILE_SIZE_B, MAX_FILE_SIZE_MB } from "@/helpers/protocolHelpers";

type Props = {
  onFileUploaded: (file: File) => Promise<void>;
  // text?: string;
  acceptedExtentions?: Accept;
};

const UploadFileForm = ({
  onFileUploaded,
  // text, // TODO: bedziemy tego uzywac?
  acceptedExtentions = {
    "image/*": [],
    "application/pdf": [],
    ".docx": [],
    ".xlsx": [],
    ".xls": [],
    ".odt": [],
    ".doc": [],
    ".rtf": [],
    ".txt": [],
    ".ods": [],
    ".csv": [],
  },
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

      const tooManyFiles = rejectedFiles.find((file) => {
        return file.errors[0].code === "too-many-files";
      });

      const fileTooLarge = rejectedFiles.find((file) => {
        return file.errors[0].code === "file-too-large";
      });

      if (tooManyFiles) {
        toast({
          title: "Zbyt dużo plików",
          description: "Maksymalnie 3 pliki",
          variant: "error",
        });
      }
      if (fileTooLarge) {
        toast({
          title: "Plik zbyt duży",
          description: `Maksymalny rozmiar pliku to ${MAX_FILE_SIZE_MB}MB`,
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
    maxSize: MAX_FILE_SIZE_B,
    accept: acceptedExtentions,
  });

  return (
    <>
      <div
        {...getRootProps()}
        className={`group relative flex h-full w-full cursor-pointer items-center justify-center transition-colors hover:opacity-60 ${isDragActive ? "bg-accent" : "bg-transparent"}`}
      >
        {isPending && (
          <div className="bg-red/50 w-100 absolute inset-0 z-10 flex items-center justify-center backdrop-blur-sm">
            <DataLoader size="sm" />
          </div>
        )}

        <input
          {...getInputProps()}
          aria-label="Prześlij plik (np. Obraz.pdf, Obraz.jpg)"
          placeholder="aaaa"
        />

        {isDragActive && <p> Upuść plik w tym miejscu </p>}

        {!isDragActive && <p> Wybierz / upuść plik z komputera </p>}
      </div>
      <div role="status" aria-live="polite" className="sr-only">
        {isPending ? "Trwa przesyłanie pliku..." : ""}
      </div>
    </>
  );
};

export default UploadFileForm;
