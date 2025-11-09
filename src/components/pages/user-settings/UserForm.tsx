"use client";

import { Button, InputFields } from "@/components/shared";
import { useForm } from "react-hook-form";

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

const UserForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div className="flex justify-center ">
      <form onSubmit={handleSubmit(onSubmit)} className="w-4/5">
        <InputFields
          register={register}
          errorMsg={errors}
          inputsData={dataInputscommittee}
        />
        <Button isLoading={isSubmitting} message="Zapisz" type="submit" />
      </form>
    </div>
  );
};

export default UserForm;
