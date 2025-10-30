import { FormCreated } from "@/types/form";

type Props = {
  form: FormCreated;
};

const Form = async (props: Props) => {
  const { form: { title, description, type, inputs } } = props
  return (
    <>
      <div className="text-lg">{title}</div>
      <div>{description}</div>
      <div className="text-sm">({type})</div>
    </>
  );
};

export default Form;
