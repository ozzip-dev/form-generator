"use client";

import { uploadFileAction } from "@/actions/protocol/uploadFileAction";
import { Button, DataLoader } from "@/components/shared";
import ModalWrapper from "@/components/shared/ModalWrapper";
import { useToast } from "@/hooks/useToast";
import IconTrash from "@/icons/iconTrash/IconTrash";
import Image from "next/image";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import DeleteDocumentConformation from "../protocolsList/DeleteDocumentConformation";
import IconPDF from "@/icons/iconPDF/IconPDF";

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
  label: string;
  setGlobalPending: Dispatch<SetStateAction<boolean>>;
  setDeleteModalOpen: Dispatch<SetStateAction<boolean>>;
};

const DocumentDrop = (props: Props) => {
  const { toast } = useToast();
  const [files, setFiles] = useState<UploadedFile[]>([]);

  const uploadFile = async (file: File) => {
    props.setGlobalPending(true);
    setFiles((prevFiles) => {
      return prevFiles.map((prevFile) => {
        return prevFile.file === file
          ? { ...prevFile, uploading: true, progress: 0 }
          : prevFile;
      });
    });

    console.log("uuuu");

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
      toast({
        title: "Błąd",
        description: `Dokument nie zostałzapisany. ${error}`,
        variant: "error",
      });
    } finally {
      props.setGlobalPending(false);
    }
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
    props.setDeleteModalOpen((prev) => !prev);
  };

  const handleDelete = () => {
    props.setDeleteModalOpen((prev) => !prev);
    console.log("hhhwha");
  };

  return (
    <>
      <div className="flex gap-3 ">
        <div>{props.label}</div>
        <div
          {...getRootProps()}
          className="relative border-2  p-4 mb-8 rounded-md transition-colors w-1/2 ml-auto w- h-32"
          style={{
            borderColor: isDragActive ? "blue" : "gray",
            backgroundColor: isDragActive ? "lightblue" : "white",
          }}
        >
          <input {...getInputProps()} />

          <div>
            <p>{isDragActive ? "Upuść plik w tym miejscu" : "Upuść plik"}</p>

            {!isDragActive && (
              <>
                <Button message="Wybierz z komputera" />

                <div className="text-xs">
                  Obsługiwane formaty: JPG, PNG, GIF, WEBP, SVG, BMP oraz PDF{" "}
                </div>
                <div className="text-xs">Maksymalny rozmiar: 5 MB</div>
              </>
            )}
          </div>
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
    </>
  );
};

export default DocumentDrop;
