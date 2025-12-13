"use client";
import { use, useState } from "react";
import ProtocolDetails from "../ProtocolDetails";
import ProtocolForm from "../protocolForm/ProtocolForm";
import { handleEditProtocol } from "./handleEditProtocol";
import { useProtocol } from "@/context/ProtocolContext";

const EditProtocol = () => {
  const [isFormPrinted, setFormPrinted] = useState(false);
  const { protocolPromise } = useProtocol();
  const protocol = use(protocolPromise);
  if (!protocol) {
    return <div>Nie znaleziono protokołu</div>;
  }

  const {
    branch,
    disputeReason,
    disputeStartDate,
    tradeUnionName,
    lastModifiedAt,
    uploadedAt,
    workplaceName,
  } = protocol;

  const handlePrintForm = () => {
    setFormPrinted((prev) => !prev);
  };

  return (
    <div className="p-4">
      {!isFormPrinted && <ProtocolDetails handlePrintForm={handlePrintForm} />}

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
