"use client";

import { publishFormAction } from "@/actions/edit-form/publishForm/publishFormAction";
import { Button } from "@/components/shared";
import { useAutoLoader } from "@/context/LoaderContextProvider";
import { useModal } from "@/context/ModalContextProvider";
import { useUser } from "@/context/UserContextProvider";
import { hasCompleteCommitteeData } from "@/helpers/hasCompleteCommitteeData";
import { FormSerialized } from "@/types/form";
import { startTransition, use, useActionState, useState } from "react";
import { useRouter } from "next/navigation";
import { FormPublishError } from "@/components/shared/errors/FormPublishError";

type Props = {
  form: FormSerialized;
};

const PublishFormButton = ({ form }: Props) => {
  const [error, setError] = useState<FormPublishError | null>(null);
  const router = useRouter();
  const { userPromise } = useUser();
  const user = use(userPromise);
  const { openModal } = useModal();

  const areUserDetails = hasCompleteCommitteeData(user);

  const [_, publishForm, isPending] = useActionState(async () => {
    try {
      const url = await publishFormAction(form);
      window.open(url, "_blank");
    } catch (e) {
      setError(e as FormPublishError);
    }
    router.refresh();
  }, null);

  const handlePublishForm = () => {
    if (!areUserDetails) {
      window.history.pushState(null, "", "?emptyUserDetails=" + Date.now());
      return;
    }
    startTransition(publishForm);
  };
  useAutoLoader(isPending);
  return (
    <>
      <Button
        message="Opublikuj"
        onClickAction={() =>
          openModal({
            action: handlePublishForm,
            header: "Publikacja formularza zablokuje jego dalszą edycję",
            confirmBtnMessage: "Opublikuj",
          })
        }
        isLoading={isPending}
      />

      {error && (
        <div className="pt-4">
          <div className="text-red-600">Błąd przy publikacji formularza</div>
          <div>{error.message}</div>
        </div>
      )}
    </>
  );
};

export default PublishFormButton;
