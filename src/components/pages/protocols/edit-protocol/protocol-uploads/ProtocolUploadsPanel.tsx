import {
  addProtocolLinkAction,
  removeProtocolLinkAction,
} from "@/actions/protocol";
import { useToast } from "@/context/ToastProvider";
import { use } from "react";
import { useProtocol } from "@/context/ProtocolContext";
import { ProtocolAttachmentCategory } from "@/types/protocol";
import { fileCategories, mapFileCategory } from "../../utils";
import ProtocolUploadedFile from "./ProtocolUploadedFile";
import ProtocolLinksForm from "./ProtocolLinksForm";
import ProtocolUploadFileForm from "./ProtocolUploadFileForm";
import { MAX_FILE_SIZE_MB } from "@/helpers/protocolHelpers";

type Props = {
  visibleCategory: ProtocolAttachmentCategory;
};

const ProtocolUploadsPanel = (props: Props) => {
  const { toast } = useToast();
  const { protocolPromise, filesPromise } = useProtocol();
  const protocol = use(protocolPromise);
  const files = use(filesPromise);

  if (!protocol || !files) {
    return <div>Nie znaleziono protokołu</div>;
  }

  const getFileById = (fileId: string) =>
    files.find((file) => file._id == fileId);

  const addLinkField = async (
    category: ProtocolAttachmentCategory,
    link: string,
  ): Promise<boolean> => {
    if (!link.trim()) {
      toast({
        title: "Błąd",
        description: "Wpisz link przed dodaniem.",
        variant: "error",
      });
      return false;
    }

    try {
      await addProtocolLinkAction({
        protocolId: protocol._id,
        link: link.trim(),
        category,
      });
      toast({
        title: "Sukces",
        description: "Link dodany",
        variant: "success",
      });
      return true;
    } catch (error) {
      toast({
        title: "Błąd",
        description: `Link nie został zapisany. ${error}`,
        variant: "error",
      });
      return false;
    }
  };

  const removeLinkField = (
    category: ProtocolAttachmentCategory,
    link: string,
  ): Promise<boolean> => {
    return (async () => {
      try {
        await removeProtocolLinkAction({
          protocolId: protocol._id,
          link,
          category,
        });
        toast({
          title: "Sukces",
          description: "Link usuniety",
          variant: "success",
        });
        return true;
      } catch (error) {
        toast({
          title: "Błąd",
          description: `Link nie został usuniety. ${error}`,
          variant: "error",
        });
        return false;
      }
    })();
  };

  return (
    <>
      {fileCategories.map((category) => (
        <div
          key={category}
          style={category != props.visibleCategory ? { display: "none" } : {}}
        >
          <div className="pb-sm text-lg font-black">
            {mapFileCategory[category]}
          </div>

          <div className="pb-4 font-black">Pliki</div>
          <div className="pb-sm">
            Dołącz pliki w odpowiedniej kategorii. <br />
            Dopuszczalne formaty <b>.pdf</b>, <b>.png</b>, <b>.jpg</b>,{" "}
            <b>.docx</b>, <b>.xlsx</b>, <b>.xls</b>, <b>.odt</b>, <b>.doc</b>,{" "}
            <b>.rtf</b>, <b>.txt</b>, <b>.ods</b>, <b>.csv</b>. <br />{" "}
            Maksymalny rozmiar jednego pliku to <b>{MAX_FILE_SIZE_MB}MB</b>.
          </div>

          <div className="pb-md md:grid md:grid-cols-2">
            <div>
              {protocol.fileIds[category]?.map((fileId) => (
                <ProtocolUploadedFile
                  key={fileId}
                  file={getFileById(fileId)!}
                  protocolId={protocol._id}
                  fileCategory={category}
                />
              ))}
            </div>

            {!!protocol ? (
              <ProtocolUploadFileForm {...{ category, protocol }} />
            ) : (
              <div>Nie znaleziono protokołu</div>
            )}
          </div>

          <div className="pb-4 pt-md font-black">Linki</div>
          <div className="pb-sm">
            Dodaj linki do stron lub postów związanych z tą kategorią.
          </div>
          <div className="w-fit min-w-[500px]">
            <ProtocolLinksForm
              category={category}
              links={protocol.links[category] || [""]}
              onAdd={addLinkField}
              onRemove={removeLinkField}
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default ProtocolUploadsPanel;
