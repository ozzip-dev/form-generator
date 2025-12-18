import EditProtocol from "@/components/pages/protocols/editProtocol/EditProtocol";
import ProtocolFileUploads from "@/components/pages/protocols/editProtocol/protocolUploads/ProtocolFileUploads";
import SuspenseErrorBoundary from "@/components/shared/errors/SuspenseErrorBoundary";

const EditProtocolPage = async () => {
  return (
    <div className="p-4">
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
