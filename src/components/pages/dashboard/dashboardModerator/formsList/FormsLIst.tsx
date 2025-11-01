import { GetFormsLstAction } from "@/actions/create-form/GetFormsListAction";
import FormLink from "./FormLink";

const FormsLIst = async () => {
  const forms = await GetFormsLstAction();

  if (!forms || forms.length === 0) {
    return <div>Brak zapisanych formularzy</div>;
  }

  return (
    <>
      <div>twoje formularze (maksymalnie 10 formularzy)</div>
      {forms.map((form) => {
        return <FormLink form={form} key={form._id} />;
      })}
    </>
  );
};

export default FormsLIst;
