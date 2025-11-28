// "use client";

// import { userDetailsSchema } from "@/lib/zodSchema/userDetailsShema";
// import { useActionState } from "react";
// import { useState, useEffect, useRef } from "react";

// const dataInputscommittee = [
//   {
//     label: "Nazwa związku zawodowego",
//     name: "committeeUnion",
//     placeholder: "Związek",
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

// function InputFields({ inputsData, errorMsg, onChange, onBlur }: any) {
//   return (
//     <>
//       {inputsData.map(({ name, type, label }: any) => (
//         <div key={name} className="flex flex-col gap-1">
//           <label className="text-sm">{label}</label>

//           <input
//             name={name}
//             type={type}
//             className={`border p-2 rounded ${
//               errorMsg?.[name] ? "border-red-500" : "border-gray-300"
//             }`}
//             onChange={(e) => onChange(name, e.target.value)}
//             onBlur={() => onBlur(name)}
//           />

//           {errorMsg?.[name] && (
//             <p className="text-red-600 text-sm">{errorMsg[name][0]}</p>
//           )}
//         </div>
//       ))}
//     </>
//   );
// }

// export default function UserDetailTest() {
//   const [state, action, isPending] = useActionState(
//     updateUserDetails,
//     undefined
//   );

//   // lokalne błędy tylko dla jednego pola
//   const [localErrors, setLocalErrors] = useState<Record<string, string[]>>({});

//   // które pola były dotknięte (focus → blur)
//   const [touched, setTouched] = useState<Record<string, boolean>>({});

//   // success message
//   const [success, setSuccess] = useState(false);

//   // debounce timer
//   const debounceRef = useRef<NodeJS.Timeout | null>(null);

//   // -------------------------
//   // SUCCESS MESSAGE ON BACKEND SUCCESS
//   // -------------------------
//   useEffect(() => {
//     if (!state) return;
//     // if (state?.success) {
//     setSuccess(true);
//     setTimeout(() => setSuccess(false), 2500);
//     // }
//   }, [state]);

//   // -------------------------
//   // VALIDACJA POJEDYNCZEGO POLA Z DEBOUNCE
//   // -------------------------
//   const validateField = (name: string, value: string) => {
//     // const fieldSchema = userDetailsSchema.shape[name];

//     // jeśli nie ma schematu — pomijamy
//     // if (!fieldSchema) return;

//     // const parsed = fieldSchema.safeParse(value);

//     const data = {
//       committeeUnion: formData.get("committeeUnion") as string,
//       committeeName: formData.get("committeeName") as string,
//       committeePhone: formData.get("committeePhone") as string,
//       committeeEmail: formData.get("committeeEmail") as string,
//     };

//     console.log("", value);

//     const parsed = userDetailsSchema.partial().safeParse(value);

//     console.log("parsed", parsed);

//     if (!parsed.success) {
//       setLocalErrors((prev) => ({
//         ...prev,
//         [name]: parsed.error.errors.map((e) => e.message),
//       }));
//     } else {
//       // usuń błąd jeśli pole poprawne
//       setLocalErrors((prev) => {
//         const { [name]: _, ...rest } = prev;
//         return rest;
//       });
//     }
//   };

//   // -------------------------
//   // Handler zmian z debounce
//   // -------------------------
//   const handleChange = (name: string, value: string) => {
//     if (debounceRef.current) clearTimeout(debounceRef.current);

//     debounceRef.current = setTimeout(() => {
//       validateField(name, value);
//     }, 500);
//   };

//   // -------------------------
//   // Focus / Blur
//   // -------------------------
//   const handleBlur = (name: string) => {
//     setTouched((prev) => ({ ...prev, [name]: true }));
//   };

//   // -------------------------
//   // MERGED ERRORS (frontend + backend)
//   // -------------------------
//   const mergedErrors = {
//     // ...state?.errors,
//     ...Object.fromEntries(
//       Object.entries(localErrors).filter(([name]) => touched[name])
//     ),
//   };

//   // -------------------------
//   // DISABLED BUTTON — kiedy są błędy lub trwa zapis
//   // -------------------------
//   const hasErrors = Object.keys(localErrors).length > 0 || isPending;

//   return (
//     <form action={action} className="space-y-6">
//       {success && (
//         <p className="text-green-600 text-sm">Zaktualizowano pomyślnie!</p>
//       )}

//       <InputFields
//         inputsData={dataInputscommittee}
//         errorMsg={mergedErrors}
//         onChange={handleChange}
//         onBlur={handleBlur}
//       />

//       <button
//         type="submit"
//         disabled={hasErrors}
//         className={`px-4 py-2 rounded ${
//           hasErrors ? "bg-gray-300" : "bg-blue-600 text-white"
//         }`}
//       >
//         {isPending ? "Zapisywanie..." : "Zapisz"}
//       </button>
//     </form>
//   );
// }
// function updateUserDetails(state: undefined): Promise<undefined> | undefined {
//   throw new Error("Function not implemented.");
// }

import { startTransition, useActionState } from "react";
import { userDetailsSchema } from "@/lib/zodSchema/userDetailsShema";
import { updateCommitteeDataAction } from "@/actions/user/updateCommitteeDataAction";
import { Button, InputFields } from "@/components/shared";
import { az } from "zod/v4/locales";

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

    console.log("data", data);

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
  const change = (name: string, value: string) => {
    // Tworzymy "mini" FormData tylko dla tego pola
    const formData = new FormData();
    const ff = formData.set(name, value);
    console.log("ff", ff);
    startTransition(() => {
      clientAction(formData);
    });
  };

  return (
    <div className="flex flex-col items-center justify-center w-full p-4">
      <form className="w-full max-w-lg space-y-4">
        <InputFields
          errorMsg={state.errors}
          inputsData={dataInputscommittee}
          onChange={change}
        />

        <Button isLoading={isPending} message="Zapisz" type="submit" />

        {state.success && (
          <p className="text-green-600">Dane zapisane poprawnie!</p>
        )}
      </form>
    </div>
  );
}
