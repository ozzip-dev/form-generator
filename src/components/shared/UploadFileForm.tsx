"use client";

import { uploadFileAction } from "@/actions/file/uploadFileAction";
import { addProtocolFileAction } from "@/actions/protocol/addProtocolFileAction";
import { Button, DataLoader } from "@/components/shared";
import { useToast } from "@/context/ToastProvider";
import { ProtocolFileCategory, ProtocolSerialized } from "@/types/protocol";
import { useCallback, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import Card from "./Card";

type Props = {
  category: ProtocolFileCategory;
  protocol: ProtocolSerialized;
};

const UploadFileForm = ({ category, protocol }: Props) => {
  const { toast } = useToast();
  const [isPending, setPending] = useState(false);

  const uploadFile = useCallback(
    async (file: File) => {
      setPending(true);

      try {
        const insertedId = await uploadFileAction(file);

        await addProtocolFileAction({
          protocolId: protocol._id,
          fileId: insertedId,
          fileCategory: category!,
        });

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
    [toast, category, protocol._id]
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

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected,
    maxFiles: 5,
    maxSize: 1024 * 1024 * 5,
    accept: { "image/*": [], "application/pdf": [] },
  });

  return (
    <div className="flex justify-center items-center flex-col mt-4">
      <Card className="!p-0 w-1/2 overflow-hidden">
        <div
          {...getRootProps()}
          className={`
              relative py-4 px-32 h-[20rem] transition-colors
              border border-default 
              ${isDragActive ? "bg-accent_opacity" : "bg-transparent"}
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
            <p className="text-lg font-black">
              {isDragActive ? "Upuść plik w tym miejscu" : "Upuść plik"}
            </p>

            {!isDragActive && (
              <>
                <Button message="Wybierz z komputera" />

                {/* TODO: jaki max rozmiar? Czy chcemy wiekszy? */}
                <div>
                  <div>
                    Obsługiwane formaty: JPG, PNG, GIF, WEBP, SVG, BMP oraz PDF{" "}
                  </div>
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
