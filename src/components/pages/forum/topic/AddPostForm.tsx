"use client";

import { addPostAction } from "@/actions/forum/addPostAction";
import { Button, FullscreenLoader, InputFields } from "@/components/shared";
import { useToast } from "@/context/ToastProvider";
import { InputData, InputType } from "@/enums";
import {
  addPostSchema,
  AddPostSchema,
} from "@/lib/zod-schema/forum-schemas/addPostSchema";
import {
  Dispatch,
  SetStateAction,
  startTransition,
  useActionState,
} from "react";

const topicInputData: InputData[] = [
  { floatingLabel: "Treść", name: "content", type: InputType.TEXT },
];

type State = { errors: Record<string, string[]>; inputs?: any };

type Props = {
  setShowPostForm: Dispatch<SetStateAction<boolean>>;
  topicId: string;
};

const AddPostForm = (props: Props) => {
  const { toast } = useToast();

  const addNewTopic = async (_: State, formData: FormData): Promise<State> => {
    const data = Object.fromEntries(formData.entries()) as AddPostSchema;

    const validationResult = addPostSchema.safeParse(data);
    if (!validationResult.success) {
      toast({
        title: "Błąd",
        description: "Nieprawidłowe dane",
        variant: "error",
      });
      return { errors: validationResult.error.formErrors.fieldErrors };
    }

    const { content } = data;

    try {
      await addPostAction(props.topicId, content);
      toast({
        title: "Sukces",
        description: "Dodano post",
        variant: "success",
      });
      props.setShowPostForm(false);
    } catch (e) {
      toast({
        title: "Błąd",
        description: "Nie udało się dodać posta",
        variant: "error",
      });
    }

    return { errors: { message: [] } };
  };

  const [state, createNewTopic, isPending] = useActionState(addNewTopic, {
    errors: {},
    inputs: null,
  });

  const onCancel = () => {
    props.setShowPostForm(false);
  };

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
        className="mt-16"
      >
        <InputFields errorMsg={state.errors} inputsData={topicInputData} />

        <div className="flex gap-8">
          <Button
            type="button"
            message="Anuluj"
            onClickAction={onCancel}
            className="!bg-white !text-accent"
          />
          <Button message="Dodaj odpowiedz" />
        </div>
      </form>
    </>
  );
};

export default AddPostForm;
