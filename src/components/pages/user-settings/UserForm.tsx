"use client";

import { updateCommitteeDataAction } from "@/actions/user/updateCommitteeDataAction";
import { Button, InputFields } from "@/components/shared";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  UserDetailsSchema,
  userDetailsSchema,
} from "@/lib/zodSchema/userDetailsShema";
import { useEffect } from "react";
import { handleClientErrors } from "@/helpers/helpersValidation/handleFormErrors";

const dataInputscommittee = [
  {
    label: "Związek zawodowy do którego należy komisja",
    name: "committeeUnion",
    placeholder: "Związek",
    type: "text",
  },
  {
    label: "Nazwa komisji",
    name: "committeeName",
    placeholder: "Komisja",
    type: "text",
  },
  {
    label: "Telefon kontaktowy komisji",
    name: "committeePhone",
    placeholder: "+48 123 456 789",
    type: "text",
  },
  {
    label: "Email kontaktowy komisji",
    name: "committeeEmail",
    placeholder: "kamil@ip.com",
    type: "email",
  },
];

type Props = {
  handlePrintForm: () => void;
  contactDetails: any;
};

const UserForm = (props: Props) => {
  const { committeeUnion, committeeName, committeePhone, committeeEmail } =
    props.contactDetails;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },

    setError,
  } = useForm<UserDetailsSchema>({
    // resolver: zodResolver(userDetailsSchema),
    defaultValues: {
      committeeUnion,
      committeeName,
      committeePhone,
      committeeEmail,
    },
    mode: "all",
  });

  const onSubmit = async (data: UserDetailsSchema) => {
    const resp = await updateCommitteeDataAction(data);
    if (resp?.error) {
      handleClientErrors<UserDetailsSchema>(resp.error, setError);
      return;
    }

    props.handlePrintForm();
  };

  const handleCancel = () => {
    props.handlePrintForm();
  };

  return (
    <div className="flex flex-col items-center justify-center ">
      <form onSubmit={handleSubmit(onSubmit)} className="w-4/5">
        <InputFields
          register={register}
          errorMsg={errors}
          inputsData={dataInputscommittee}
        />
        <Button isLoading={isSubmitting} message="Zapisz" type="submit" />
      </form>
      <div className="w-4/5 mt-4">
        <Button message="Anuluj" onClickAction={handleCancel} />
      </div>
    </div>
  );
};

export default UserForm;
