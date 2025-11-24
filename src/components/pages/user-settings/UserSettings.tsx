"use client";

import { useState } from "react";
import UserDetails from "./UserDetails";
import UserForm from "./UserForm";
import { SuspenseErrorBoundary } from "@/components/shared";

type Props = {
  userDetails: any;
};

const UserSettings = (props: Props) => {
  const [isFormPrinted, setFormPrinted] = useState(false);

  const handlePrintForm = () => {
    setFormPrinted((prev) => !prev);
  };

  return (
    <>
      {!isFormPrinted && (
        <UserDetails
          handlePrintForm={handlePrintForm}
          contactDetails={props.userDetails}
        />
      )}
      {isFormPrinted && (
        <SuspenseErrorBoundary
          size="lg"
          errorMessage="Błąd przesyłu danych formularza"
        >
          <UserForm
            handlePrintForm={handlePrintForm}
            contactDetails={props.userDetails}
          />
        </SuspenseErrorBoundary>
      )}{" "}
      <div className="w-fit ml-auto"></div>
    </>
  );
};

export default UserSettings;
