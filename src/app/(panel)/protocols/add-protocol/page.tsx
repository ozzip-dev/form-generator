"use client";

import { handleAddProtocol } from "@/components/pages/protocols/protocolForm/handleAddProtocol";
import ProtocolForm from "@/components/pages/protocols/protocolForm/ProtocolForm";

const AddProtocolPage = () => {
  return (
    <>
      <div className="text-[30px] font-black">Krok 1: uzupełnij dane</div>
      <ProtocolForm mode="addProtocol" onSubmit={handleAddProtocol} />
    </>
  );
};

export default AddProtocolPage;
