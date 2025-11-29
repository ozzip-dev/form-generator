"use client";

import {
  startTransition,
  use,
  useActionState,
  useEffect,
  useRef,
  useState,
} from "react";
import { userDetailsSchema } from "@/lib/zodSchema/userDetailsShema";
import { updateCommitteeDataAction } from "@/actions/user/updateCommitteeDataAction";
import { Button, FullscreenLoader, InputFields } from "@/components/shared";
import { useUser } from "@/context/UserContextProvider";
import { InputFieldsAA } from "@/components/shared/inputs/InputFields";

// const dataInputscommittee = [
//   {
//     label: "Nazwa związku zawodowego",
//     name: "committeeUnion",
//     placeholder: "Związek",
//     defaultValue: "aoooo",
//     type: "text",
//   },
//   {
//     label: "Nazwa struktury związku",
//     name: "committeeName",
//     placeholder: "Komisja",
//     type: "text",
//   },
//   {
//     label: "Telefon kontaktowy struktury",
//     name: "committeePhone",
//     placeholder: "+48 123 456 789",
//     type: "text",
//   },
//   {
//     label: "Email kontaktowy struktury",
//     name: "committeeEmail",
//     placeholder: "kamil@ip.com",
//     type: "email",
//   },
// ];

// type State = {
//   errors: Record<string, string[]>;
//   success: boolean;
// };

// const initialState: State = {
//   errors: {},
//   success: false,
// };

// type Props = { handlePrintForm: () => void };

// export default function UserDetailTest(props: Props) {
//   const { userPromise } = useUser();
//   const userData: any = use(userPromise);

//   const [values, setValues] = useState({
//     committeeUnion: userData.committeeUnion,
//     committeeName: userData.committeeName,
//     committeePhone: userData.committeePhone,
//     committeeEmail: userData.committeeEmail,
//   });
//   const [touched, setTouched] = useState<Record<string, boolean>>({});
//   const isAction = useRef(false);

//   const [state, clientAction, isPending] = useActionState(akcja, initialState);

//   async function akcja(prevState: State, formData: FormData): Promise<State> {
//     const data = Object.fromEntries(formData.entries());

//     const parsed = userDetailsSchema.safeParse(data);

//     if (!parsed.success) {
//       return {
//         errors: parsed.error.formErrors.fieldErrors,
//         success: false,
//       };
//     }
//     isAction.current = true;
//     await updateCommitteeDataAction(parsed.data);
//     isAction.current = false;
//     return {
//       errors: {},
//       success: true,
//     };
//   }

//   const onChange = (name: string, value: string) => {
//     const newValues = { ...values, [name]: value };
//     setValues(newValues);
//     setTouched({ ...touched, [name]: true });

//     const formData = new FormData();
//     Object.entries(newValues).forEach(([k, v]) =>
//       formData.append(k, v as string)
//     );

//     startTransition(() => clientAction(formData));
//   };
//   return (
//     <form className="space-y-4">
//       {isAction.current && isPending && <FullscreenLoader />}
//       <InputFieldsAA
//         inputsData={dataInputscommittee}
//         errorMsg={Object.fromEntries(
//           Object.entries(state.errors).filter(([key]) => touched[key])
//         )}
//         values={values}
//         onChange={onChange}
//       />
//     </form>
//   );
// }

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
    const data = Object.fromEntries(formData.entries()) as any;

    const validationResult = userDetailsSchema.safeParse(data);
    if (!validationResult.success) {
      return {
        errors: validationResult.error.formErrors.fieldErrors,
        inputs: data,
      };
    }

    isAction.current = true;

    const resp = await updateCommitteeDataAction(data);
    if (resp?.errors) {
      return { errors: resp.errors, inputs: data };
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
