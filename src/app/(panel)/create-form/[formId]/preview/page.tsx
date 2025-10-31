import { GetFormAction } from "@/actions/create-form/GetFormAction";
import InputFields from "@/components/inputs/InputFields";
import Button from "@/components/ui/buttons/Button";
import { InputType } from "@/enums";

type Props = { params: Promise<{ formId: string }> };

const PagePreview = async (props: Props) => {
  const { formId } = await props.params;
  const { form } = await GetFormAction(formId);
  InputType;

  console.log("", form);
  const { title, description, inputs } = form;

  const dataFormInputs = inputs.map(({ type, header, description }: any) => {
    const inputText = [
      {
        label: header,
        name: header,
        placecholder: "Odpowiedź",
        type,
        description,
      },
    ];

    console.log("", inputText);

    if (type === "superText") {
      return <>textarea</>;
    } else {
      return <InputFields inputsData={inputText} />;
    }
  });

  return (
    <div className="flex justify-center ">
      <div className="w-4/5">
        <h1 className="text-4xl">{title}</h1>
        {description && <h2 className="text-2xl mb-6">{description}</h2>}
        <form className="w-4/5 bg-zinc-100 p-4">
          {dataFormInputs}

          <Button message="Zatwierdź" disabled={true} />
        </form>{" "}
        <div className="w-fit ml-auto">
          <Button message="Opublikuj" type="button" />
        </div>
      </div>
    </div>
  );
};

export default PagePreview;
