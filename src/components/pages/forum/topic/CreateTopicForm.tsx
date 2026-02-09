"use client";

import { addTopicAction } from "@/actions/forum/addTopicAction";
import { Button, FullscreenLoader, InputFields } from "@/components/shared";
import { TopicCategory } from "@/enums/forum";
import { useToast } from "@/context/ToastProvider";
import {
  createTopicSchema,
  CreateTopicSchema,
} from "@/lib/zod-schema/forum-schemas/createTopicSchema";
import { startTransition, useActionState } from "react";
import Card from "@/components/shared/Card";
import { redirect } from "next/navigation";

const topicInputData: { floatingLabel: string; name: string; type: string }[] =
  [
    { floatingLabel: "Temat", name: "title", type: "text" },
    { floatingLabel: "Opis", name: "description", type: "text" },
  ];

const categorySelectOptions = [
  { floatingLabel: "Formularz", value: TopicCategory.FORM },
  { floatingLabel: "Protokół", value: TopicCategory.PROTOCOL },
  { floatingLabel: "Inne", value: TopicCategory.OTHER },
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
    } catch (e: unknown) {
      toast({
        title: "Błąd",
        description: "Nie udało się stworzyć tematu",
        variant: "error",
      });
      return { errors: { message: [(e as Error)?.message || "Błąd"] } };
    }

    redirect("/forum/list");

    return { errors: { message: [] } };
  };

  const [state, createNewTopic, isPending] = useActionState(addNewTopic, {
    errors: {},
    inputs: null,
  });

  return (
    <Card className="mx-8">
      {isPending && <FullscreenLoader />}
      <div className="text-lg font-black pb-8">Utwórz nowy temat</div>
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
          <option key="empty" value="">
            Wybierz
          </option>
          {categorySelectOptions.map(({ value, floatingLabel }) => (
            <option key={value} value={value}>
              {floatingLabel}
            </option>
          ))}
        </select>

        <Button message="Utwórz" className="mt-6" />
      </form>
    </Card>
  );
};

export default CreateTopicForm;
