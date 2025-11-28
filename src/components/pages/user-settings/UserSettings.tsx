// "use client";

// import { useState } from "react";
// import UserDetails from "./UserDetails";
// import UserForm from "./UserForm";
// import { SuspenseErrorBoundary } from "@/components/shared";

// const UserSettings = () => {
//   const [isFormPrinted, setFormPrinted] = useState(false);

//   const handlePrintForm = () => {
//     setFormPrinted((prev) => !prev);
//   };

//   return (
//     <>
//       <div>Dane kontaktowe</div>
//       {!isFormPrinted && (
//         <SuspenseErrorBoundary
//           size="lg"
//           errorMessage="Błąd przesyłu danych formularza"
//         >
//           <UserDetails handlePrintForm={handlePrintForm} />
//         </SuspenseErrorBoundary>
//       )}
//       {isFormPrinted && (
//         <SuspenseErrorBoundary
//           size="lg"
//           errorMessage="Błąd przesyłu danych formularza"
//         >
//           <UserForm handlePrintForm={handlePrintForm} />
//         </SuspenseErrorBoundary>
//       )}{" "}
//       <div className="w-fit ml-auto"></div>
//     </>
//   );
// };

// export default UserSettings;

"use client";

import { useState } from "react";
import UserDetails from "./UserDetails";
import UserForm from "./UserForm";
import { SuspenseErrorBoundary } from "@/components/shared";
import UserDetailTest from "./UserActionTest";

const UserSettings = () => {
  const [isFormPrinted, setFormPrinted] = useState(false);

  const handlePrintForm = () => {
    setFormPrinted((prev) => !prev);
  };

  return (
    <>
      <div>Dane kontaktowe</div>
      {!isFormPrinted && (
        <SuspenseErrorBoundary
          size="lg"
          errorMessage="Błąd przesyłu danych formularza"
        >
          <UserDetails handlePrintForm={handlePrintForm} />
        </SuspenseErrorBoundary>
      )}
      {isFormPrinted && (
        <>
          {/* <SuspenseErrorBoundary
            size="lg"
            errorMessage="Błąd przesyłu danych formularza"
          >
            <UserForm handlePrintForm={handlePrintForm} />
          </SuspenseErrorBoundary> */}
          <>
            <UserDetailTest />
          </>
        </>
      )}{" "}
      <div className="w-fit ml-auto"></div>
    </>
  );
};

export default UserSettings;
