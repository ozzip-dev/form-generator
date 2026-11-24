"use client";

import { DataLoader } from "@/components/shared";
import { useToast } from "@/context/ToastProvider";
import { useCallback, useTransition } from "react";
import { Accept, FileRejection, useDropzone } from "react-dropzone";
import { MAX_FILE_SIZE_B, MAX_FILE_SIZE_MB } from "@/helpers/protocolHelpers";

type Props = {
  onFileUploaded: (file: File) => Promise<void>;
  text?: string;
  acceptedExtentions?: Accept;
};

const UploadFileForm = ({
  onFileUploaded,
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
  text,
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
        className={`group relative flex h-full w-full cursor-pointer items-center justify-center overflow-hidden rounded-sm border border-transparent transition-colors hover:rounded-sm hover:border-accent hover:bg-white hover:text-accent ${isDragActive ? "rounded-sm border-accent bg-accent" : "bg-transparent"}`}
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

        {isDragActive && (
          <div className="flex w-full flex-col items-center justify-between rounded-sm p-4 text-white sm:flex-row">
            {text && <p className="flex-1 font-bold">{text}</p>}
            <div className="flex-1 text-center">
              <p> Upuść</p>
              <p className="text-center text-xs">Maksymalny rozmiar: 1 MB</p>
            </div>
          </div>
        )}

        {!isDragActive && (
          <div className="flex w-full flex-col items-center justify-between p-4 sm:flex-row">
            {text && <p className="flex-1 font-bold">{text}</p>}
            <div className="flex-1 text-center">
              <p> Upuść / wybierz plik </p>
              <p className="text-center text-xs">Maksymalny rozmiar: 1 MB</p>
            </div>
          </div>
        )}
      </div>
      <div role="status" aria-live="polite" className="sr-only">
        {isPending ? "Trwa przesyłanie pliku..." : ""}
      </div>
    </>
  );
};

export default UploadFileForm;
