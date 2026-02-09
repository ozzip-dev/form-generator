import EditProtocol from "@/components/pages/protocols/edit-protocol/EditProtocol";
import ProtocolFileUploads from "@/components/pages/protocols/edit-protocol/protocol-uploads/ProtocolFileUploads";
import SuspenseErrorBoundary from "@/components/shared/errors/SuspenseErrorBoundary";

const EditProtocolPage = async () => {
  return (
    <div className="p-4 pb-16">
      <SuspenseErrorBoundary size="lg" errorMessage="Brak danych protokołu">
        <EditProtocol />
      </SuspenseErrorBoundary>
      <SuspenseErrorBoundary size="lg" errorMessage="Brak plików">
        <ProtocolFileUploads />
      </SuspenseErrorBoundary>
    </div>
  );
};

export default EditProtocolPage;
