"use client";

import Card from "@/components/shared/Card";
import { useUser } from "@/context/UserContextProvider";
import { isUserAuthor } from "@/helpers/formHelpers";
import { FormSerialized } from "@/types/form";
import { UserSerialized } from "@/types/user";
import { use } from "react";
import RemoveFormButton from "../RemoveFormButton";
import AliasUrlForm from "./AliasUrlForm";
import PublishFormButton from "./PublishFormButton";

type Props = {
  form: FormSerialized;
};

const FormActions = ({ form }: Props) => {
  const { _id, url } = form;
  const formUrl: string = `/${url || _id}`;

  const { userPromise } = useUser();
  const user: UserSerialized | null = use(userPromise);
  const isAuthor = user && isUserAuthor(form, user._id);

  return (
    <>
      <div className="mt-6 flex justify-between">
        <PublishFormButton form={form} />
        {isAuthor && _id && <RemoveFormButton formId={_id} />}
      </div>
      <Card className="my-6">
        <div className="mb-2 flex gap-2">
          <div>Aders:</div>
          <div className="font-bold">{formUrl}</div>
        </div>
        <AliasUrlForm {...form} />
      </Card>
    </>
  );
};

export default FormActions;
