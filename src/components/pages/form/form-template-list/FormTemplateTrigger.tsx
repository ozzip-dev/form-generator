"use client";

import { startTransition, useActionState } from "react";
import { createFormDraftAction } from "@/actions/create-form/createFormDraftAction";
import { Button, ButtonLink, Card, Icon } from "@/components/shared";
import IconCart from "@/components/shared/icons/IconCart";

type Props = {
  _id: string;
  id: string;
  title: string;
  iconName: string;
};

const FormTemplateTrigger = (props: Props) => {
  const [state, createForm, isPending] = useActionState<
    Promise<null | {
      error: string;
    }>
  >(async () => {
    return await createFormDraftAction(props.id);
  }, null);

  const handleCreateForm = () => {
    startTransition(async () => {
      startTransition(createForm);
    });
  };

  return (
    <Card className="flex h-full flex-col">
      <IconCart>
        <Icon icon={props.iconName} size={22} className="shrink-0 bg-white" />
      </IconCart>

      <h3 className="py-8">{props.title} </h3>

      <div className="mt-auto pt-4">
        <Button
          onClickAction={handleCreateForm}
          isLoading={isPending}
          variant="primary-rounded"
          ariaLabel={props.title}
          className="group mb-4 mt-auto w-full"
        >
          <div className="flex items-center gap-2">
            <Icon
              icon="plus-solid-full"
              size={18}
              className="shrink-0 bg-white group-hover:bg-accent"
            />{" "}
            Użyj
          </div>
        </Button>
      </div>

      <ButtonLink
        link={`/${props._id}`}
        target="_blank"
        variant="empty-accent"
        className="group"
      >
        <div className="m-auto flex w-fit gap-2">
          <Icon
            icon="eye"
            size={22}
            className="shrink-0 bg-accent group-hover:bg-white"
          />{" "}
          Podgląd
        </div>
      </ButtonLink>

      {state?.error && (
        <div className="text-center text-error">
          <div className="mt-4">{state.error}</div>
        </div>
      )}
    </Card>
  );
};

export default FormTemplateTrigger;
