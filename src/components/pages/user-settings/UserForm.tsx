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
};
const UserForm = (props: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<UserDetailsSchema>({
    resolver: zodResolver(userDetailsSchema),
  });

  const onSubmit = async (data: any) => {
    console.log(data);
    await updateCommitteeDataAction(data);
    props.handlePrintForm();
  };

  const handleCancel = () => {
    props.handlePrintForm();
  };

  useEffect(() => {
    const subscription = watch((values) => {
      console.log("Aktualne wartości:", values);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

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
        <Button
          isLoading={isSubmitting}
          message="Anuluj"
          onClickAction={handleCancel}
        />
      </div>
    </div>
  );
};

export default UserForm;
