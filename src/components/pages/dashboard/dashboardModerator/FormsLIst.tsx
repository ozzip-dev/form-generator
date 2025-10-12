import { GetFormsLst } from "@/actions/form/GetFormsList";

const FormsLIst = async () => {
  const forms = await GetFormsLst();

  return (
    <>
      <div>twoje formy</div>
      {forms.map(({ title, _id }) => {
        return <div>{title}</div>;
      })}
    </>
  );
};

export default FormsLIst;
