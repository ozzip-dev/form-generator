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
import Card from "@/components/shared/Card";

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
    <div className="">
      <>
        <div className="mt-6 flex justify-between">
          <PublishFormButton form={form} />
          {isAuthor && _id && <RemoveFormButton formId={_id} />}
        </div>
        <Card className="my-6">
          <div className="mb-20 flex flex-col gap-4 md:mb-8 md:flex-row md:items-center">
            <div className="flex gap-2">
              <div>Adres:</div>
              <div className="font-bold">{formUrl}</div>
            </div>
            <div className="flex items-center gap-4 md:ml-auto">
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
          </div>
          <AliasUrlForm {...form} />
        </Card>
      </>
    </div>
  );
};

export default FormActions;
