import { addProtocolFile } from "@/actions/protocol";
import EditProtocol from "@/components/pages/protocols/EditProtocol";
import ProtocolDetails from "@/components/pages/protocols/ProtocolDetails";
import ProtocolFileUploads from "@/components/pages/protocols/ProtocolFileUploads";
import { getFilesByFileIdsNoData } from "@/services/file-service";
import { getProtocolById } from "@/services/protocol-service";
import { ProtocolFileCategory } from "@/types/protocol";
import { redirect } from "next/navigation";

const EditProtocolPage = async ({
  params,
}: {
  params: Promise<{ protocolId: string }>;
}) => {
  const { protocolId } = await params;

  // const {
  //   branch,
  //   disputeReason,
  //   disputeStartDate,
  //   tradeUnionName,
  //   lastModifiedAt,
  //   uploadedAt,
  //   workplaceName,
  //   files: fileIds,
  // } = await getProtocolById(protocolId);

  const protocol = await getProtocolById(protocolId);

  // const fieldIdArray = Object.keys(fileIds)
  //   .map((key) => fileIds[key as ProtocolFileCategory])
  //   .flat();

  // const files = await getFilesByFileIdsNoData(fieldIdArray);

  // const addFile = async (
  //   protocolId: string,
  //   category: ProtocolFileCategory,
  //   fileId: string
  // ) => {
  //   "use server";
  //   await addProtocolFile({ protocolId, fileId, fileCategory: category });
  // };

  return (
    <div className="p-4">
      <EditProtocol protocol={protocol} />
      {/* <ProtocolDetails
        {...{
          branch,
          disputeReason,
          disputeStartDate,
          tradeUnionName,
          lastModifiedAt,
          uploadedAt,
          workplaceName,
        }}
      />

      <ProtocolFileUploads
        id={protocolId}
        files={files}
        fileIds={fileIds}
        addFile={addFile}
      /> */}
    </div>
  );
};

export default EditProtocolPage;
