// "use client";

import { updateCommitteeDataAction } from "@/actions/user/updateCommitteeDataAction";
import { Button, InputFields } from "@/components/shared";
import { useUser } from "@/context/UserContextProvider";
import {
  userDetailsSchema,
  UserDetailsSchema,
} from "@/lib/zodSchema/userDetailsShema";
import { use, useActionState, useRef } from "react";

const dataInputscommittee = [
  { label: "Nazwa związku zawodowego", name: "committeeUnion", type: "text" },
  { label: "Nazwa struktury związku", name: "committeeName", type: "text" },
  {
    label: "Telefon kontaktowy struktury",
    name: "committeePhone",
    type: "text",
  },
  {
    label: "Email kontaktowy struktury",
    name: "committeeEmail",
    type: "email",
  },
];
type State = { errors: Record<string, string[]>; inputs?: any };
const initialState: State = { errors: {}, inputs: null };
type Props = { handlePrintForm: () => void };

const UserForm = (props: Props) => {
  const { userPromise } = useUser();
  const userData: any = use(userPromise);
  const isAction = useRef(false);

  const initialValues = [
    "committeeUnion",
    "committeeName",
    "committeePhone",
    "committeeEmail",
  ].reduce((acu: Record<string, string>, key: string) => {
    acu[key] = userData[key];
    return acu;
  }, {});

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

    const resp = await updateCommitteeDataAction(data);
    if (resp?.validationErrors) {
      return { errors: resp?.validationErrors, inputs: data };
    }
    isAction.current = false;
    props.handlePrintForm();
    return { errors: {}, inputs: data };
  };

  const [state, formAction, isPending] = useActionState(
    editUserDetails,
    initialState
  );

  const defaultValues = state?.inputs ? state?.inputs : initialValues;

  return (
    <div className="flex flex-col items-center justify-center w-full p-4">
      <form action={formAction} className="w-full max-w-lg space-y-4">
        <InputFields
          errorMsg={state.errors}
          inputsData={dataInputscommittee}
          default={defaultValues}
        />
        <Button
          isLoading={isAction.current && isPending}
          message="Zapisz"
          type="submit"
        />
      </form>
      <div className="w-4/5 mt-4">
        <Button
          message="Anuluj"
          onClickAction={() => {
            props.handlePrintForm();
          }}
        />
      </div>
    </div>
  );
};
export default UserForm;
