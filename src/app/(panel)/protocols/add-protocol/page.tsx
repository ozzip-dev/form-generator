"use client";

import { handleAddProtocol } from "@/components/pages/protocols/protocolForm/handleAddProtocol";
import ProtocolForm from "@/components/pages/protocols/protocolForm/ProtocolForm";

// TODO: gdy ustalimy strukture stron do dodawania/edycji/przegladania protokolow,
// poprawic pliki layout i sciezki w menu
const AddProtocolPage = () => {
  return (
    <>
      <div className="text-[30px] font-black">Krok 1: uzupełnij dane</div>
      <ProtocolForm onSubmit={handleAddProtocol} />;
    </>
  );
};

export default AddProtocolPage;
