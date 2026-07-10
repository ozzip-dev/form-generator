import { addAcceptedValuesAction } from "@/actions/edit-form/accepted-values/addAcceptedValuesAction";
import { Button } from "@/components/shared";
import { useInputData } from "@/context/InputDataContextProvider";
import { useAutoLoader } from "@/context/LoaderContextProvider";
import { InputType } from "@/enums";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import AcceptedValueBox from "./AcceptedValueBox";

const parseAcceptedValues = (
  value: string,
  inputType: InputType,
): (string | number)[] => {
  const values = value
    .split(";")
    .map((entry) => entry.trim())
    .filter(Boolean);

  if (inputType === InputType.NUMBER || inputType === InputType.PESEL) {
    return values.map((entry) => {
      const parsedValue = Number(entry);
      return Number.isFinite(parsedValue) ? parsedValue : entry;
    });
  }

  return values;
};

const AcceptedValuesSection = () => {
  const { formId, input } = useInputData();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const [acceptedValuesInput, setAcceptedValuesInput] = useState("");

  useAutoLoader(isPending, "small");

  const handleSaveAcceptedValues = () => {
    if (!formId || !input.id) return;

    const values = parseAcceptedValues(acceptedValuesInput, input.type);
    if (!values.length) return;

    startTransition(async () => {
      try {
        const { newValues, duplicatedValues } = await addAcceptedValuesAction(
          formId as string,
          input.id!,
          values,
        );
        alert(
          `
            Dodane wartości (${newValues.length}): ${newValues.join(", ")}
            \n
            Powtórzone wartości (${duplicatedValues.length}): ${duplicatedValues.join(", ")}
          `,
        );
        setAcceptedValuesInput("");
        router.refresh();
      } catch (error) {
        const invalidValues = (error as Error).message
          .split(",")
          .map((value) => value.trim())
          .filter(Boolean);

        alert(
          `Niepoprawne wartości (${invalidValues.length}): ${invalidValues.join(", ")}`,
        );
      }
    });
  };

  const btnText: string = isOpen ? "Schowaj" : "Dodaj akceptowane wartości";

  return (
    <div className="mt-5 flex w-full flex-col gap-3 text-sm">
      <Button
        type="button"
        variant="primary-rounded"
        className="w-fit rounded-sm border border-default px-3 py-2 text-font_dark"
        message={btnText}
        aria-expanded={isOpen}
        onClickAction={() => setIsOpen((prev) => !prev)}
      />

      {isOpen && (
        <div className="flex w-full flex-col gap-2">
          {input.acceptedValues?.length && (
            <>
              <div>Akceptowane wartości: ({input.acceptedValues.length})</div>
              <div className="flex flex-wrap gap-3">
                {input.acceptedValues
                  .sort((a, b) => a - b)
                  .map((value, idx) => (
                    <AcceptedValueBox value={value} key={idx} />
                  ))}
              </div>
            </>
          )}

          <textarea
            value={acceptedValuesInput}
            onChange={(e) => setAcceptedValuesInput(e.target.value)}
            placeholder="Wpisz wartości oddzielone średnikami"
            className="min-h-24 w-full rounded-sm border border-default p-2 text-sm focus:border-accent focus:outline-none"
          />

          <Button
            type="button"
            variant="primary-rounded"
            className="w-fit px-4 py-2"
            message="Dodaj"
            isLoading={isPending}
            onClickAction={handleSaveAcceptedValues}
          />
        </div>
      )}
    </div>
  );
};

export default AcceptedValuesSection;
