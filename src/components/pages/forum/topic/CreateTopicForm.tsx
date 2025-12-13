"use client";

import { addTopicAction } from "@/actions/forum/addTopicAction";
import { FullscreenLoader, InputFields } from "@/components/shared";
import { TopicCategory } from "@/enums/forum";
import { useToast } from "@/hooks/useToast";
import {
  createTopicSchema,
  CreateTopicSchema,
} from "@/lib/zodSchema/forumSchemas/createTopicSchema";
import { startTransition, useActionState, useRef } from "react";

const topicInputData: { label: string; name: string; type: string }[] = [
  { label: "Temat", name: "title", type: "text" },
  { label: "Opis", name: "description", type: "text" },
];

const categorySelectOptions = [
  { label: "Wybor inspektora", value: TopicCategory.INSPECTOR },
  { label: "Strajk", value: TopicCategory.STRIKE },
  { label: "Inne", value: TopicCategory.OTHER },
];

type State = { errors: Record<string, string[]>; inputs?: any };

const CreateTopicForm = () => {
  const { toast } = useToast();

  const addNewTopic = async (_: State, formData: FormData): Promise<State> => {
    const data = Object.fromEntries(formData.entries()) as CreateTopicSchema;

    const validationResult = createTopicSchema.safeParse(data);
    if (!validationResult.success) {
      toast({
        title: "Błąd",
        description: "Nieprawidłowe dane",
        variant: "error",
      });
      return { errors: validationResult.error.formErrors.fieldErrors };
    }

    const { title, category, description } = data;

    try {
      await addTopicAction(title, category as TopicCategory, description);
      toast({
        title: "Sukces",
        description: "Utworzono temat",
        variant: "success",
      });
    } catch (e) {
      toast({
        title: "Błąd",
        description: "Nie udało się stworzyć tematu",
        variant: "error",
      });
    }

    return { errors: { message: [] } };
  };

  const [state, createNewTopic, isPending] = useActionState(addNewTopic, {
    errors: {},
    inputs: null,
  });

  return (
    <>
      {isPending && <FullscreenLoader />}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          startTransition(() => {
            createNewTopic(new FormData(e.currentTarget));
          });
        }}
      >
        <InputFields errorMsg={state.errors} inputsData={topicInputData} />

        <select name="category">
          {categorySelectOptions.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>

        <button>Utworz</button>
      </form>
    </>
  );
};

export default CreateTopicForm;
