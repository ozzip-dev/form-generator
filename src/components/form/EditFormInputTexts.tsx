import { EditTexts } from "@/actions/input";
import { FormInput } from "@/types/input";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

type Props = {
  formId: string;
  input: FormInput;
  index: number;
};

export default function EditFormInputTexts(props: Props) {
  const {
    formId,
    input: { id: inputId, header, description, type },
    index,
  } = props;
  const { register, watch, setValue } = useFormContext();

  const headerKey = `inputs.${index}.header`;
  const descriptionKey = `inputs.${index}.description`;
  const [watchedHeader, watchedDescription] = [headerKey, descriptionKey].map(
    (key) => watch(key)
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      EditTexts(formId, inputId!, {
        header: watchedHeader,
        description: watchedDescription,
      });
    }, 1000);
    return () => clearTimeout(timeout);
  }, [watchedHeader, watchedDescription, formId, inputId]);

  useEffect(() => {
    setValue(headerKey, header);
    setValue(descriptionKey, description);
  }, [header, description, type, setValue, headerKey, descriptionKey]);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <label htmlFor={headerKey}>Nagłówek: </label>
        <input
          type="text"
          {...register(headerKey)}
          className="border border-black mr-4"
        />
      </div>

      <div>
        <label htmlFor={descriptionKey}>Opis: </label>
        <input
          type="text"
          {...register(descriptionKey)}
          className="border border-black mr-4"
        />
      </div>
    </div>
  );
}
