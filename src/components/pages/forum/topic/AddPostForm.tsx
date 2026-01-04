"use client";

import { addPostAction } from "@/actions/forum/addPostAction";
import { Button, FullscreenLoader, InputFields } from "@/components/shared";
import { useToast } from "@/context/ToastProvider";
import {
  addPostSchema,
  AddPostSchema,
} from "@/lib/zodSchema/forumSchemas/addPostSchema";
import {
  Dispatch,
  SetStateAction,
  startTransition,
  useActionState,
} from "react";

const topicInputData: { floatingLabel: string; name: string; type: string }[] =
  [{ floatingLabel: "Treść", name: "content", type: "text" }];

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

        <Button message="Dodaj odpowiedz" />
      </form>
    </>
  );
};

export default AddPostForm;
