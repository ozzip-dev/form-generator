import { addProtocolFile } from "@/actions/protocol";
import ProtocolDetails from "@/components/pages/protocols/ProtocolDetails";
import ProtocolFileUploads from "@/components/pages/protocols/ProtocolFileUploads";
import { formatDateAndTime } from "@/helpers/dates/formatDateAndTime";
import { db } from "@/lib/mongo";
import { serializeProtocol } from "@/lib/serialize-utils";
import { getAllFiles, getFilesByFileIdsNoData } from "@/services/file-service";
import { getProtocolById, getProtocols } from "@/services/protocol-service";
import { Protocol, ProtocolFileCategory, ProtocolSerialized } from "@/types/protocol";
import { redirect } from "next/navigation";

const EditProtocolPage = async ({ params }: { params: Promise<{ protocolId: string }> }) => {
  const { protocolId } = await params
  try {
    const {
      branch,
      disputeReason,
      disputeStartDate,
      tradeUnionName,
      lastModifiedAt,
      uploadedAt,
      workplaceName,
      files: fileIds
    } = await getProtocolById(protocolId)

    const fieldIdArray = Object.keys(fileIds)
      .map((key) => fileIds[key as ProtocolFileCategory])
      .flat()

    const files = await getFilesByFileIdsNoData(fieldIdArray)
    
    const addFile = async (protocolId: string, category: ProtocolFileCategory, fileId: string) => {
      'use server'
      await addProtocolFile({ protocolId, fileId, fileCategory: category })
    }

    return (
      <div>
        <ProtocolDetails 
          {...{
            branch,
            disputeReason,
            disputeStartDate,
            tradeUnionName,
            lastModifiedAt,
            uploadedAt,
            workplaceName
          }}
        />

        <ProtocolFileUploads id={protocolId} files={files} fileIds={fileIds} addFile={addFile} />
      </div>
    );
  } catch(e) {
    console.error(e)
    redirect('/protocols/add')
  }
};

export default EditProtocolPage;
