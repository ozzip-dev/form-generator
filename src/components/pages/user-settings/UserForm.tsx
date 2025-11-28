"use client";

import { updateCommitteeDataAction } from "@/actions/user/updateCommitteeDataAction";
import { Button, InputFields } from "@/components/shared";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  UserDetailsSchema,
  userDetailsSchema,
} from "@/lib/zodSchema/userDetailsShema";
import { handleClientErrors } from "@/helpers/helpersValidation/handleFormErrors";
import { useErrorBoundary } from "react-error-boundary";
import { useUser } from "@/context/UserContextProvider";
import { use, useActionState } from "react";

const dataInputscommittee = [
  {
    label: "Nazwa związku zawodowego",
    name: "committeeUnion",
    placeholder: "Związek",
    type: "text",
  },
  {
    label: "Nazwa struktury związku",
    name: "committeeName",
    placeholder: "Komisja",
    type: "text",
  },
  {
    label: "Telefon kontaktowy struktury",
    name: "committeePhone",
    placeholder: "+48 123 456 789",
    type: "text",
  },
  {
    label: "Email kontaktowy struktury",
    name: "committeeEmail",
    placeholder: "kamil@ip.com",
    type: "email",
  },
];

type Props = {
  handlePrintForm: () => void;
};

const UserForm = (props: Props) => {
  const { showBoundary } = useErrorBoundary();
  const { userPromise } = useUser();

  const user: any = use(userPromise);

  const { committeeUnion, committeeName, committeePhone, committeeEmail } =
    user;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<UserDetailsSchema>({
    resolver: zodResolver(userDetailsSchema),
    defaultValues: {
      committeeUnion,
      committeeName,
      committeePhone,
      committeeEmail,
    },
    mode: "all",
  });

  const onSubmit = async (data: UserDetailsSchema) => {
    try {
      const resp = await updateCommitteeDataAction(data);
      if (resp?.error) {
        handleClientErrors<UserDetailsSchema>(resp.error, setError);
        return;
      }
    } catch (err) {
      showBoundary(err);
      return;
    }

    props.handlePrintForm();
  };

  const [state, action, isPending] = useActionState(akcja, undefined);

  async function akcja(prevState: unknown, formData: FormData) {
    console.log("", formData);

    const name = formData.get("name") as string;
    const adres = formData.get("adres") as string;

    const data = {
      name,
      adres,
    };

    console.log("", data);

    return;
  }

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

        <input type="text" name="name" className="border" />
        <input type="text" name="adres" className="border" />
        <Button isLoading={isSubmitting} message="Zapisz" type="submit" />
      </form>
      <div className="w-4/5 mt-4">
        <Button message="Anuluj" onClickAction={handleCancel} />
      </div>
    </div>
  );
};

export default UserForm;

// import { useActionState } from "react";
// import { userDetailsSchema } from "@/lib/zodSchema/userDetailsShema";
// import { updateCommitteeDataAction } from "@/actions/user/updateCommitteeDataAction";

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

// export default function UserForm() {
//   const [state, clientAction, isPending] = useActionState(akcja, initialState);

//   async function akcja(prevState: State, formData: FormData): Promise<State> {
//     const data = {
//       committeeUnion: formData.get("committeeUnion") as string,
//       committeeName: formData.get("committeeName") as string,
//       committeePhone: formData.get("committeePhone") as string,
//       committeeEmail: formData.get("committeeEmail") as string,
//     };

//     const parsed = userDetailsSchema.safeParse(data);

//     if (!parsed.success) {
//       return {
//         errors: parsed.error.formErrors.fieldErrors,
//         success: false,
//       };
//     }

//     await updateCommitteeDataAction(parsed.data);

//     return {
//       errors: {},
//       success: true,
//     };
//   }

//   return (
//     <div className="flex flex-col items-center justify-center w-full p-4">
//       <form action={clientAction} className="w-full max-w-lg space-y-4">
//         <InputFields errorMsg={state.errors} inputsData={dataInputscommittee} />

//         <Button isLoading={isPending} message="Zapisz" type="submit" />

//         {state.success && (
//           <p className="text-green-600">Dane zapisane poprawnie!</p>
//         )}
//       </form>
//     </div>
//   );
// }
