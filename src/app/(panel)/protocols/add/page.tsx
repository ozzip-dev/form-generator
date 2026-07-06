import { handleAddProtocol } from "@/components/pages/protocols/protocol-form/handleAddProtocol";
import ProtocolForm from "@/components/pages/protocols/protocol-form/ProtocolForm";
import { SuspenseErrorBoundary } from "@/components/shared";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Formy pracy - Dodawanie protokołu",
};

const AddProtocolPage = () => {
  return (
    <>
      <SuspenseErrorBoundary size="lg" errorMessage="Brak danych protokołu">
        <div className="container mb-16">
          <h1 className="pb-sm text-xl">Krok 1: uzupełnij dane</h1>
          <ProtocolForm mode="addProtocol" onSubmit={handleAddProtocol} />
        </div>
      </SuspenseErrorBoundary>
    </>
  );
};

export default AddProtocolPage;
