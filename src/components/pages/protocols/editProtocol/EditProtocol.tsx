"use client";
import { useState } from "react";
import ProtocolDetails from "../ProtocolDetails";
import ProtocolForm from "../protocolForm/ProtocolForm";
import { handleEditProtocol } from "./handleEditProtocol";

const EditProtocol = () => {
  const [isFormPrinted, setFormPrinted] = useState(false);

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
        />
      )}
    </div>
  );
};

export default EditProtocol;
