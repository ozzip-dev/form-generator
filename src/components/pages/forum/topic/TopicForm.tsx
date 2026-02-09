"use client";

import { editTopicAction } from "@/actions/forum/editTopicAction";
import { Button, FullscreenLoader, InputFields } from "@/components/shared";
import Card from "@/components/shared/Card";
import SectionHeader from "@/components/shared/SectionHeader";
import { TopicCategory } from "@/enums/forum";
import { useToast } from "@/context/ToastProvider";
import {
  CreateTopicSchema,
  createTopicSchema,
} from "@/lib/zod-schema/forum-schemas/createTopicSchema";
import { TopicSerializedDetailed } from "@/types/forum";
import { useActionState, useRef } from "react";

const topicInputData: { label: string; name: string; type: string }[] = [
  { label: "Temat", name: "title", type: "text" },
  { label: "Opis", name: "description", type: "text" },
];

const categorySelectOptions = [
  { label: "Formularz", value: TopicCategory.FORM },
  { label: "Protokół", value: TopicCategory.PROTOCOL },
  { label: "Inne", value: TopicCategory.OTHER },
];

type State = { errors: Record<string, string[]>; inputs?: any };
const initialState: State = { errors: {}, inputs: null };

type Props = {
  topic: TopicSerializedDetailed;
  handlePrintForm: () => void;
};

const TopicForm = (props: Props) => {
  const { toast } = useToast();
  const { topic, handlePrintForm } = props;
  const isAction = useRef(false);

  const inputsWithDefaults = topicInputData.map((input) => ({
    ...input,
    defaultValue:
      input.name === "title"
        ? topic.title
        : input.name === "description"
          ? topic.description || ""
          : "",
  }));

  const editTopic = async (_: State, formData: FormData): Promise<State> => {
    const data = Object.fromEntries(formData.entries()) as CreateTopicSchema;

    const validationResult = createTopicSchema.safeParse(data);
    if (!validationResult.success) {
      return {
        errors: validationResult.error.formErrors.fieldErrors,
        inputs: data,
      };
    }

    isAction.current = true;

    try {
      await editTopicAction(
        topic._id,
        data.title,
        data.category as TopicCategory,
        data.description,
      );
      toast({
        title: "Sukces",
        description: "Temat zaktualizowany",
        variant: "success",
      });
      isAction.current = false;
      handlePrintForm();
      return { errors: {}, inputs: data };
    } catch (e) {
      toast({
        title: "Błąd",
        description: `Błąd aktualizacji tematu, ${e}`,
        variant: "error",
      });
      return { errors: { message: [(e as Error)?.message || "Błąd"] } };
    }
  };

  const [state, formAction, isPending] = useActionState(
    editTopic,
    initialState,
  );

  return (
    <>
      <form action={formAction}>
        <Card>
          <SectionHeader message="Edytuj temat" />
          <InputFields
            errorMsg={state.errors}
            inputsData={inputsWithDefaults}
          />

          <select
            name="category"
            defaultValue={topic.category}
            className="border border-gray-300 rounded p-2 w-full mt-4"
          >
            <option key="empty" value="">
              Wybierz
            </option>
            {categorySelectOptions.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </Card>

        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-10 sm:gap-16">
          <Button
            message="Anuluj"
            onClickAction={handlePrintForm}
            type="button"
            className="m-auto w-full sm:w-fit"
          />
          <Button
            message="Zapisz"
            type="submit"
            className="m-auto w-full sm:w-fit"
            disabled={isPending}
          />
        </div>
      </form>
      {isPending && <FullscreenLoader />}
    </>
  );
};

export default TopicForm;
