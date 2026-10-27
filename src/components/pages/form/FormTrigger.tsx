"use client";

import { createFormDraftAction } from "@/actions/create-form/createFormDraftAction";
import { Card, Icon } from "@/components/shared";
import { useAutoLoader } from "@/context/LoaderContextProvider";
import { startTransition, useActionState } from "react";

type Props = {
  freePlaces: number;
};

const FormTrigger = ({ freePlaces }: Props) => {
  const [state, createForm, isPending] = useActionState<
    Promise<null | {
      error: string;
    }>
  >(async () => {
    return await createFormDraftAction("empty");
  }, null);

  useAutoLoader(isPending);

  const handleCreateForm = () => {
    startTransition(createForm);
  };

  return (
    <>
      <button
        aria-label="Dodaj nowy formularz"
        onClick={handleCreateForm}
        className="mb-4 block h-full w-full sm:mb-0"
      >
        {" "}
        <Card className="cardHover flex h-full w-full items-center justify-center bg-transparent hover:bg-white">
          <div>
            <div className="m-auto flex h-12 w-12 items-center justify-center rounded-full border border-gray bg-white">
              <Icon icon="plus-solid-full" size={20} className="bg-accent" />
            </div>

            <div className="text-center text-accent">Nowy formularz</div>
            <div className="mt-2 text-sm text-font-light">
              Wolne miejsca {freePlaces}
            </div>

            <div className="mt-4 text-center text-sm text-error">
              {state?.error && state.error}
            </div>
          </div>
        </Card>{" "}
      </button>
    </>
  );
};

export default FormTrigger;
