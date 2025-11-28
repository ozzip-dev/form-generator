"use client";

import { updateCommitteeDataAction } from "@/actions/user/updateCommitteeDataAction";
import { Button, InputFields } from "@/components/shared";
import { userDetailsSchema } from "@/lib/zodSchema/userDetailsShema";
import { useActionState } from "react";
import { useState, useEffect, useRef } from "react";

// import { startTransition, useActionState } from "react";
// import { userDetailsSchema } from "@/lib/zodSchema/userDetailsShema";
// import { updateCommitteeDataAction } from "@/actions/user/updateCommitteeDataAction";
// import { Button, InputFields } from "@/components/shared";

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

// export default function UserDetailTest() {
//   const [state, clientAction, isPending] = useActionState(akcja, initialState);

//   async function akcja(prevState: State, formData: FormData): Promise<State> {
//     const key = Array.from(formData.keys())[0]!;
//     const value = formData.get(key);

//     type Fields = keyof typeof userDetailsSchema.shape;

//     if (!Object.keys(userDetailsSchema.shape).includes(key)) {
//       return prevState;
//     }

//     const fieldSchema = userDetailsSchema.shape[key as Fields];

//     const parsed = fieldSchema.safeParse(value);

//     if (!parsed.success) {
//       return {
//         errors: { [key]: parsed.error.errors.map((e) => e.message) },
//         success: false,
//       };
//     }

//     await updateCommitteeDataAction({ [key]: parsed.data });

//     return {
//       errors: {},
//       success: true,
//     };
//   }

//   const change = (name: string, value: string) => {
//     console.log("name", name);
//     console.log("value", value);
//     const formData = new FormData();
//     formData.set(name, value);
//     console.log("ff", formData.set(name, value));
//     startTransition(() => {
//       clientAction(formData);
//     });
//   };

//   return (
//     <div className="flex flex-col items-center justify-center w-full p-4">
//       <form className="w-full max-w-lg space-y-4">
//         <InputFields
//           errorMsg={state.errors}
//           inputsData={dataInputscommittee}
//           onChange={change}
//         />

//         <Button isLoading={isPending} message="Zapisz" type="submit" />

//         {state.success && (
//           <p className="text-green-600">Dane zapisane poprawnie!</p>
//         )}
//       </form>
//     </div>
//   );
// }

const dataInputscommittee = [
  {
    label: "Nazwa związku zawodowego",
    name: "committeeUnion",
    placeholder: "Związek",
    defaultValue: "aoooo",
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

type State = {
  errors: Record<string, string[]>;
  success: boolean;
};

const initialState: State = {
  errors: {},
  success: false,
};

export default function UserForm() {
  const [state, clientAction, isPending] = useActionState(akcja, initialState);

  async function akcja(prevState: State, formData: FormData): Promise<State> {
    const data = {
      committeeUnion: formData.get("committeeUnion") as string,
      committeeName: formData.get("committeeName") as string,
      committeePhone: formData.get("committeePhone") as string,
      committeeEmail: formData.get("committeeEmail") as string,
    };

    const parsed = userDetailsSchema.safeParse(data);

    if (!parsed.success) {
      return {
        errors: parsed.error.formErrors.fieldErrors,
        success: false,
      };
    }

    await updateCommitteeDataAction(parsed.data);

    return {
      errors: {},
      success: true,
    };
  }

  return (
    <div className="flex flex-col items-center justify-center w-full p-4">
      <form action={clientAction} className="w-full max-w-lg space-y-4">
        <InputFields errorMsg={state.errors} inputsData={dataInputscommittee} />

        <Button isLoading={isPending} message="Zapisz" type="submit" />

        {state.success && (
          <p className="text-green-600">Dane zapisane poprawnie!</p>
        )}
      </form>
    </div>
  );
}
