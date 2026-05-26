import Image from "next/image";
import { ReactNode } from "react";
import { Button } from "@/components/shared";
import { FileSerialized } from "@/types/file";

type PreviewFile = Pick<FileSerialized, "name" | "type" | "data">;

type OpenModal = (config: {
  header: ReactNode;
  component: (props: { close: () => void }) => ReactNode;
}) => void;

export const openProtocolImagePreviewModal = (
  openModal: OpenModal,
  fileData: PreviewFile,
) => {
  const imageSrc = `data:${fileData.type || "image/*"};base64,${fileData.data}`;

  openModal({
    header: fileData.name || "Podgląd obrazka",
    component: ({ close }) => (
      <div className="flex flex-col items-center gap-6">
        <Image
          src={imageSrc}
          alt={fileData.name || "Podgląd pliku"}
          width={1200}
          height={900}
          unoptimized
          className="max-h-[70vh] w-auto max-w-[85vw] rounded-sm"
        />
        <Button message="Zamknij" onClickAction={close} />
      </div>
    ),
  });
};
