"use client";

import { useUser } from "@/context/UserContextProvider";
import { isUserAuthor } from "@/helpers/formHelpers";
import { FormSerialized } from "@/types/form";
import { UserSerialized } from "@/types/user";
import { use } from "react";
import RemoveFormButton from "../RemoveFormButton";
import AliasUrlForm from "./AliasUrlForm";
import PublishFormButton from "./PublishFormButton";
import { Card } from "@/components/shared";
import CreatedUpdatedInfo from "../CreatedUpdatedInfo";

type Props = {
  form: FormSerialized;
};

const FormActions = ({ form }: Props) => {
  const { _id, url, createdAt, updatedAt } = form;
  const formUrl: string = `/${url || _id}`;

  const { userPromise } = useUser();
  const user: UserSerialized | null = use(userPromise);
  const isAuthor = user && isUserAuthor(form, user._id);

  return (
    <div>
      <div className="md:flex md:items-center md:justify-between">
        <CreatedUpdatedInfo createdAt={createdAt} updatedAt={updatedAt} />

        <div className="mt-6 flex items-center justify-between gap-10 sm:justify-end">
          {isAuthor && _id && <RemoveFormButton formId={_id} />}
          <PublishFormButton form={form} />
        </div>
      </div>
      <Card className="my-6">
        <div className="mb-2 flex gap-2">
          <div>Aders:</div>
          <div className="font-bold">{formUrl}</div>
        </div>
        <AliasUrlForm {...form} />
      </Card>
    </div>
  );
};

export default FormActions;
