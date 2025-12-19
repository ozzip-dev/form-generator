"use client";
import { use, useState } from "react";
import ProtocolDetails from "./ProtocolDetails";
import ProtocolForm from "../protocolForm/ProtocolForm";
import { handleEditProtocol } from "../protocolForm/handleEditProtocol";
import { useProtocol } from "@/context/ProtocolContext";

const EditProtocol = () => {
  const [isFormPrinted, setFormPrinted] = useState(false);
  const { protocolPromise } = useProtocol();
  const protocol = use(protocolPromise);

  if (!protocol) {
    return <div>Nie znaleziono protokołu</div>;
  }

  const handlePrintForm = () => {
    setFormPrinted((prev) => !prev);
  };

  return (
    <div className="p-4">
      {!isFormPrinted && <ProtocolDetails handlePrintForm={handlePrintForm} />}

      {isFormPrinted && (
        <ProtocolForm
          mode="editProtocol"
          protocol={protocol}
          onSubmit={(data, setError) =>
            handleEditProtocol(protocol._id, data, setError)
          }
          handlePrintForm={handlePrintForm}
        />
      )}
    </div>
  );
};

export default EditProtocol;
