import { Button, IconTrash } from "@/components/shared";
import { ProtocolFormSchema } from "@/lib/zod-schema/protocolFormSchema";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { confirmAction } from "@/helpers/confirmAction";

type DemandsFieldProps = {
  demandFields: Array<{ id: string }>;
  appendDemand: (value: string) => void;
  removeDemand: (index: number) => void;
  control: Control<ProtocolFormSchema>;
  errors: FieldErrors<ProtocolFormSchema>;
  isSubmitting: boolean;
};

const DemandsField = ({
  demandFields,
  appendDemand,
  removeDemand,
  control,
  errors,
  isSubmitting,
}: DemandsFieldProps) => {
  return (
    <div className="relative flex flex-col pb-[1.7rem] text-sm md:mt-[2.2rem] md:flex-row md:items-start">
      <div className="mb-1 mt-2 block w-[22rem] font-semibold md:mb-0 md:mr-4 md:text-right">
        <span>Konkretne żądania:</span>
      </div>
      <div className="flex w-full flex-col gap-4 md:flex-1">
        {demandFields.map((field, idx) => (
          <div key={field.id} className="flex items-center gap-2">
            <div className="flex-1">
              <Controller
                name={`demands.${idx}`}
                control={control}
                render={({ field: inputField }) => (
                  <input
                    {...inputField}
                    id={`demands.${idx}`}
                    type="text"
                    placeholder="Wpisz żądanie (maks. 100 znaków)"
                    maxLength={100}
                    disabled={isSubmitting}
                    className={`peer w-full rounded-sm border p-2 focus:border-accent focus:outline-none disabled:bg-gray-100 ${
                      (errors.demands as any)?.[idx]
                        ? "border-red"
                        : "border-default"
                    }`}
                  />
                )}
              />
              {(errors.demands as any)?.[idx] && (
                <span className="text-red text-sm">
                  {(errors.demands as any)?.[idx]?.message}
                </span>
              )}
            </div>
            <Button
              type="button"
              icon={<IconTrash />}
              variant="ghost"
              className="!bg-transparent opacity-50 hover:opacity-100 disabled:opacity-30"
              ariaLabel="Usuń żądanie"
              disabled={isSubmitting}
              onClickAction={() => {
                confirmAction({
                  confirmText: "Czy na pewno usunąć to żądanie?",
                  action: () => removeDemand(idx),
                  yesText: "Usuń",
                  noText: "Anuluj",
                });
              }}
            />
          </div>
        ))}
        <Button
          type="button"
          message="Dodaj żądanie"
          onClickAction={() => appendDemand("")}
          variant="primary-rounded"
          disabled={isSubmitting}
          className="w-fit"
        />
      </div>
    </div>
  );
};

export default DemandsField;
