"use client";

import { ButtonLink, Card } from "@/components/shared";
import { useFormData } from "@/context/FormDataContextProvider";
import { useUser } from "@/context/UserContextProvider";
import { isUserAuthor } from "@/helpers/formHelpers";
import { UserSerialized } from "@/types/user";
import { use } from "react";
import RemoveFormButton from "./RemoveFormButton";
import { formatDateAndTime } from "@/helpers/dates/formatDateAndTime";

const FormActiveInfo = () => {
  const { formDataPromise } = useFormData();
  const { userPromise } = useUser();
  const user: UserSerialized | null = use(userPromise);
  const form = use(formDataPromise);

  if (!form) return null;

  const { _id, title, url, createdAt, updatedAt } = form;

  const isAuthor = user && isUserAuthor(form, user._id);

  return (
    <>
      <Card className="my-16">
        <div className="my-16 text-center text-lg font-bold text-font_light">
          <div>
            Opublikowany formularz <br />{" "}
          </div>
          <div className="text-sm">
            Utworzono: {formatDateAndTime(createdAt)}
          </div>
          <div className="text-sm">
            Opublikowano: {formatDateAndTime(updatedAt)}
          </div>
          <span className="text-font_dark">{title}</span>
          <br /> <span className="text-sm">Edycja niedostępna</span>
        </div>

        <ButtonLink
          message="Przejdź do opublikowanego formularza"
          link={`/${url ? url : _id!}`}
          target="_blank"
          variant="primary-rounded"
          className="m-auto w-fit"
        />
      </Card>

      {isAuthor && _id && (
        <div className="ml-auto w-fit">
          <RemoveFormButton formId={_id} />
        </div>
      )}
    </>
  );
};

export default FormActiveInfo;
