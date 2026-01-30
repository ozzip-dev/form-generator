"use client"

import { ButtonLink } from "@/components/shared";
import { useFormData } from "@/context/FormDataContextProvider";
import { useUser } from "@/context/UserContextProvider";
import { isUserAuthor } from "@/helpers/formHelpers";
import { UserSerialized } from "@/types/user";
import { use } from "react";
import RemoveFormButton from "./RemoveFormButton";
import Card from "@/components/shared/Card";



const FormActiveInfo = () => {
  const { formDataPromise } = useFormData();
  const { userPromise } = useUser();
  const user: UserSerialized | null = use(userPromise);
  const form = use(formDataPromise);

  if (!form) return null

  const { _id, title, url } = form;

  const isAuthor = user && isUserAuthor(form, user._id);

  return (<>
    <Card className="my-16">
      <div className="text-center text-font_light text-lg font-bold my-16">
        Opublikowany formularz <br /> <span className="text-font_dark">{title}</span>
        <br /> <span className="text-sm">Edycja niedostępna
        </span>
      </div>

      <ButtonLink
        message="Przejdź do opublikowanego formularza"
        link={`/${url ? url : _id!}`}
        target="_blank"
        className="w-fit h-fit bg-accent rounded-full 
                text-white text-sm py-2 px-6 hover:bg-accent_light m-auto"
      />{" "}
    </Card>


    {
      isAuthor && _id && <div className="w-fit m-auto md:m-0 ">
        <RemoveFormButton formId={_id} />
      </div>
    }
  </>
  );
};

export default FormActiveInfo;
