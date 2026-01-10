"use client";

import { publishFormAction } from "@/actions/edit-form/publishForm/publishFormAction";
import { Button } from "@/components/shared";
import { useUser } from "@/context/UserContextProvider";
import { hasCompleteCommitteeData } from "@/helpers/hasCompleteCommitteeData";
import { FormSerialized } from "@/types/form";
import { startTransition, use, useActionState } from "react";

type Props = {
  form: FormSerialized;
};

const PublishFormButton = ({ form }: Props) => {
  const { userPromise } = useUser();
  const user = use(userPromise);

  const areUserDetails = hasCompleteCommitteeData(user);

  const [_, publishForm, isPending] = useActionState(async () => {
    const url = await publishFormAction(form);
    window.open(url, "_blank");
  }, null);

  const handlePublishForm = () => {
    if (!areUserDetails) {
      window.history.pushState(null, "", "?emptyUserDetails=" + Date.now());
      return;
    }
    startTransition(publishForm);
  };

  return (
    <>
      <Button
        message="Opublikuj"
        onClickAction={handlePublishForm}
        isLoading={isPending}
      />
    </>
  );
};

export default PublishFormButton;
