"use client";
import { addProtocolFile } from "@/actions/protocol";
import { getFilesByFileIdsNoData } from "@/services/file-service";
import { ProtocolFileCategory } from "@/types/protocol";
import ProtocolDetails from "../ProtocolDetails";
import ProtocolFileUploads from "../ProtocolFileUploads";
import { useState } from "react";
import ProtocolForm from "../protocolForm/ProtocolForm";
import { handleEditProtocol } from "./handleEditProtocol";

type Props = {
  protocol: any;
  files: any;
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

  console.log("fileIds", fileIds);

  const handlePrintForm = () => {
    setFormPrinted((prev) => !prev);
  };

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
        <ProtocolForm
          handlePrintForm={handlePrintForm}
          onSubmit={handleEditProtocol}
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

      {/* <ProtocolFileUploads
        id={protocolId}
        files={files}
        fileIds={fileIds}
        addFile={addFile}
      /> */}

      {/* 
      <ProtocolFileUploads files={props.files} fileIds={fileIds} /> */}
    </div>
  );
};

export default EditProtocol;
