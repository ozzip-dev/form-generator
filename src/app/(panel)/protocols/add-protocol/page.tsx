"use client";

import { handleAddProtocol } from "@/components/pages/protocols/protocolForm/handleAddProtocol";
import ProtocolForm from "@/components/pages/protocols/protocolForm/ProtocolForm";
import SuspenseErrorBoundary from "@/components/shared/errors/SuspenseErrorBoundary";

const AddProtocolPage = () => {



  
  return (
    <>
      <SuspenseErrorBoundary size="lg" errorMessage="Brak danych protokołu">
        <div className="text-[30px] font-black">Krok 1: uzupełnij dane</div>
        <ProtocolForm mode="addProtocol" onSubmit={handleAddProtocol} />
      </SuspenseErrorBoundary>
    </>
  );
};

export default AddProtocolPage;
