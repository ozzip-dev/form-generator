"use client";

import { publishFormAction } from "@/actions/edit-form/publishForm/publishFormAction";
import { Button } from "@/components/shared";
import { useAutoLoader } from "@/context/LoaderContextProvider";
import { useModal } from "@/context/ModalContextProvider";
import { usePublishFormErrorSetters } from "@/context/PublishFormErrorContextProvider";
import { useUser } from "@/context/UserContextProvider";
import { hasCompleteCommitteeData } from "@/helpers/hasCompleteCommitteeData";
import { FormSerialized } from "@/types/form";
import { startTransition, use, useActionState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  form: FormSerialized;
};

const PublishFormButton = ({ form }: Props) => {
  const { setHeaderPublishError, setAddFieldPublishError } =
    usePublishFormErrorSetters();
  const router = useRouter();
  const { userPromise } = useUser();
  const user = use(userPromise);
  const { openModal } = useModal();

  const areUserDetails = hasCompleteCommitteeData(user);

  const [_, publishForm, isPending] = useActionState(async () => {
    const result = await publishFormAction(form);
    if (result.success) {
      window.open(result.msg, "_blank");
      router.refresh();
    } else {
      console.log('', result)
      setHeaderPublishError(result);
      setAddFieldPublishError(result.addFieldError);
    }
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
    <Button
      message="Opublikuj"
      onClickAction={() =>
        openModal({
          action: handlePublishForm,
          header: (
            <>
              Publikacja formularza zablokuje możliwość jego edycji
              <br />
              oraz zmiany jego adresu.
            </>
          ),
        })
      }
      isLoading={isPending}
      className="mb-8"
    />
  );
};

export default PublishFormButton;
