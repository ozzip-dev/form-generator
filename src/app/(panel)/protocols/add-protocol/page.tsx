import ProtocolForm from "@/components/pages/protocols/protocolForm/ProtocolForm";

// TODO: gdy ustalimy strukture stron do dodawania/edycji/przegladania protokolow,
// poprawic pliki layout i sciezki w menu
const AddProtocolPage = async () => {
  return (
    <>
      <div className="text-[30px] font-black">Krok 1: uzupełnij dane</div>
      <ProtocolForm />;
    </>
  );
};

export default AddProtocolPage;
