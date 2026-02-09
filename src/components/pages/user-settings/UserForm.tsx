"use client";

import { updateCommitteeDataAction } from "@/actions/user/updateCommitteeDataAction";
import { Button, Card, InputFields } from "@/components/shared";
import SectionHeader from "@/components/shared/SectionHeader";
import { useUser } from "@/context/UserContextProvider";
import {
  userDetailsSchema,
  UserDetailsSchema,
} from "@/lib/zod-schema/userDetailsShema";
import { use, useActionState, useRef } from "react";

const dataInputscommittee = [
  {
    staticLabel: "Nazwa związku zawodowego:",
    name: "committeeUnion",
    type: "text",
    placeholder: "Związek",
    labelClassName: "w-[22rem]"
  },
  {
    staticLabel: "Nazwa struktury związku:",
    name: "committeeName",
    type: "text",
    placeholder: "Komisja",
    labelClassName: "w-[22rem]"
  },
  {
    staticLabel: "Telefon kontaktowy struktury:",
    name: "committeePhone",
    type: "text",
    placeholder: "111-111-111",
    labelClassName: "w-[22rem]"
  },
  {
    staticLabel: "Email kontaktowy struktury:",
    name: "committeeEmail",
    type: "email",
    placeholder: "email@zzz.pl",
    labelClassName: "w-[22rem]"
  },
];

type State = { errors: Record<string, string[]>; inputs?: any };

const initialState: State = { errors: {}, inputs: null };

type Props = {
  handlePrintForm?: () => void,
  mode?: "edit" | "create";
};

const UserForm = (props: Props) => {
  const userCtx = useUser();
  const isEditMode = props.mode === "edit";
  const userDetails = isEditMode ? use(userCtx!.userPromise) : null;


  const isAction = useRef(false);


  const editUserDetails = async (
    prevState: State,
    formData: FormData
  ): Promise<State> => {
    const data = Object.fromEntries(formData.entries()) as UserDetailsSchema;

    const validationResult = userDetailsSchema.safeParse(data);
    if (!validationResult.success) {
      return {
        errors: validationResult.error.formErrors.fieldErrors,
        inputs: data,
      };
    }

    isAction.current = true;

    const resp = await updateCommitteeDataAction(data, isEditMode);
    if (resp?.validationErrors) {
      return { errors: resp?.validationErrors, inputs: data };
    }
    isAction.current = false;
    isEditMode && props.handlePrintForm?.();
    return { errors: {}, inputs: data };
  };

  const [state, formAction, isPending] = useActionState(
    editUserDetails,
    initialState
  );


  const inputsWithDefaults = dataInputscommittee.map((input) => ({
    ...input,
    defaultValue:
      state.inputs?.[input.name] ??
      userDetails?.[input.name] ??
      "",
  }));

  return (
    <>
      <form action={formAction}>
        <Card>
          <SectionHeader message="Dane kontaktowe:" />
          <InputFields
            errorMsg={state.errors}
            inputsData={inputsWithDefaults}
            variant="horizontal"
          />{" "}
        </Card>
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-10 sm:gap-16">
          {isEditMode && <Button
            message="Anuluj"
            onClickAction={() => {
              isEditMode && props.handlePrintForm?.();
            }}
            type="button"
            className="!bg-white !text-accent hover:!bg-accent hover:!text-white"
          />
          }
          <Button
            isLoading={isAction.current && isPending}
            message="Zapisz"
            type="submit"
          />
        </div>
      </form>
    </>
  );
};
export default UserForm;
