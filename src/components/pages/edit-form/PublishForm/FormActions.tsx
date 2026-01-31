"use client";

import { Button, ButtonLink } from "@/components/shared";
import { useToast } from "@/context/ToastProvider";
import { FormSerialized } from "@/types/form";
import AliasUrlForm from "./AliasUrlForm";
import PublishFormButton from "./PublishFormButton";
import RemoveFormButton from "../RemoveFormButton";
import { useUser } from "@/context/UserContextProvider";
import { UserSerialized } from "@/types/user";
import { use } from "react";
import { isUserAuthor } from "@/helpers/formHelpers";

type Props = {
  form: FormSerialized;
};

const FormActions = ({ form }: Props) => {

  const { _id, url } = form;
  const formUrl: string = `/${url || _id}`;

  const { toast } = useToast();
  const getFormUrl = () => `${window.location.origin}${formUrl}`;

  const { userPromise } = useUser();
  const user: UserSerialized | null = use(userPromise);
  const isAuthor = user && isUserAuthor(form, user._id);

  const copyUrl = () => {
    navigator.clipboard.writeText(getFormUrl());

    toast({
      title: "Skopiowano URL",
      variant: "success",
    });
  };

  return (
    <div className="my-16">
      <>
        <PublishFormButton form={form} />
        <div className="mb-8 flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex flex-col gap-2 md:flex-row text-center">
            <div>Aders:</div>
            <div className="font-bold">{formUrl}</div>
          </div>
          <div className="flex justify-center gap-4 md:ml-auto">
            <Button
              onClickAction={copyUrl}
              message="Kopiuj"
              type="button"
              variant="primary-rounded"
              className="h-fit"
            />
            <ButtonLink
              message="Przejdź do formularza"
              link={formUrl}
              target="_blank"
              variant="primary-rounded"
            />{" "}
          </div>

          {isAuthor && _id && <div className="w-fit m-auto md:m-0 ">
            <RemoveFormButton formId={_id} />  </div>
          }
        </div>
        <AliasUrlForm {...form} />
      </>
    </div>
  );
};

export default FormActions;
