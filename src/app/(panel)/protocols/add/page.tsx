"use client";

import { handleAddProtocol } from "@/components/pages/protocols/protocolForm/handleAddProtocol";
import ProtocolForm from "@/components/pages/protocols/protocolForm/ProtocolForm";
import SuspenseErrorBoundary from "@/components/shared/errors/SuspenseErrorBoundary";

const AddProtocolPage = () => {
  return (
    <>
      <SuspenseErrorBoundary size="lg" errorMessage="Brak danych protokołu">
        <div className="container mb-16">
          <div className="text-xl pb-sm">Krok 1: uzupełnij dane</div>
          <ProtocolForm mode="addProtocol" onSubmit={handleAddProtocol} />
        </div>
      </SuspenseErrorBoundary>
    </>
  );
};

export default AddProtocolPage;
