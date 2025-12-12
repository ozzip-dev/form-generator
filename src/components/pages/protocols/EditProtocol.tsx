"use client";
import { addProtocolFile } from "@/actions/protocol";
import { getFilesByFileIdsNoData } from "@/services/file-service";
import { ProtocolFileCategory } from "@/types/protocol";
import ProtocolDetails from "./ProtocolDetails";
import ProtocolFileUploads from "./ProtocolFileUploads";
import { useState } from "react";
import ProtocolForm from "./protocolForm/ProtocolForm";

type Props = {
  protocol: any;
};

const EditProtocol = (props: Props) => {
  const {
    branch,
    disputeReason,
    disputeStartDate,
    tradeUnionName,
    lastModifiedAt,
    uploadedAt,
    workplaceName,
    files: fileIds,
  } = props.protocol;

  const [isFormPrinted, setFormPrinted] = useState(false);
  const fieldIdArray = Object.keys(fileIds)
    .map((key) => fileIds[key as ProtocolFileCategory])
    .flat();

  const handlePrintForm = () => {
    setFormPrinted((prev) => !prev);
  };

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
      {!isFormPrinted && (
        <ProtocolDetails
          handlePrintForm={handlePrintForm}
          protocol={{
            branch,
            disputeReason,
            disputeStartDate,
            tradeUnionName,
            lastModifiedAt,
            uploadedAt,
            workplaceName,
          }}
        />
      )}

      {isFormPrinted && (
        <>
          <ProtocolForm
            handlePrintForm={handlePrintForm}
            protocol={{
              branch,
              disputeReason,
              disputeStartDate,
              tradeUnionName,
              lastModifiedAt,
              uploadedAt,
              workplaceName,
            }}
          />
        </>
      )}

      {/* <ProtocolFileUploads
        id={protocolId}
        files={files}
        fileIds={fileIds}
        addFile={addFile}
      /> */}
    </div>
  );
};

export default EditProtocol;
