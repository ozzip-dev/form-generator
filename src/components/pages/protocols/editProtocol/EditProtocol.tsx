"use client";
import { addProtocolFile } from "@/actions/protocol";
import { getFilesByFileIdsNoData } from "@/services/file-service";
import { ProtocolFileCategory } from "@/types/protocol";
import ProtocolDetails from "../ProtocolDetails";
import ProtocolFileUploads from "../ProtocolFileUploads";
import { use, useState } from "react";
import ProtocolForm from "../protocolForm/ProtocolForm";
import { handleEditProtocol } from "./handleEditProtocol";
import { useProtocol } from "@/context/ProtocolContext";

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

  const { protocolPromise } = useProtocol();
  const protocol = use(protocolPromise);

  console.log("protocol", protocol);

  const [isFormPrinted, setFormPrinted] = useState(false);

  // console.log("fileIds", fileIds);

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
    </div>
  );
};

export default EditProtocol;
