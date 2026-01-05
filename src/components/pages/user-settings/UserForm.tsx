// "use client";

import { updateCommitteeDataAction } from "@/actions/user/updateCommitteeDataAction";
import { Button, InputFields } from "@/components/shared";
import Card from "@/components/shared/Card";
import { useUser } from "@/context/UserContextProvider";
import {
  userDetailsSchema,
  UserDetailsSchema,
} from "@/lib/zodSchema/userDetailsShema";
import { use, useActionState, useRef } from "react";

const dataInputscommittee = [
  {
    staticLabel: "Nazwa związku zawodowego:",
    name: "committeeUnion",
    type: "text",
  },
  {
    staticLabel: "Nazwa struktury związku:",
    name: "committeeName",
    type: "text",
  },
  {
    staticLabel: "Telefon kontaktowy struktury:",
    name: "committeePhone",
    type: "text",
  },
  {
    staticLabel: "Email kontaktowy struktury:",
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
    <>
      <form action={formAction}>
        <Card>
          <div className="text-center md:text-left text-lg font-bold mb-6">
            Dane kontaktowe
          </div>
          <InputFields
            errorMsg={state.errors}
            inputsData={dataInputscommittee}
            default={defaultValues}
            variant="horizontal"
          />{" "}
        </Card>
        <div className="flex justify-center mt-16 gap-16">
          <Button
            message="Anuluj"
            onClickAction={() => {
              props.handlePrintForm();
            }}
            type="button"
          />

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
