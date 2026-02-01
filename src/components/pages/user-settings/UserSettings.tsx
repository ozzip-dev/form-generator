"use client";

import { SuspenseErrorBoundary } from "@/components/shared";
import { useState } from "react";
import UserDetails from "./UserDetails";
import UserForm from "./UserForm";

const UserSettings = () => {
  const [isFormPrinted, setFormPrinted] = useState(false);

  const handlePrintForm = () => {
    setFormPrinted((prev) => !prev);
  };

  return (
    <>
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
          <SuspenseErrorBoundary
            size="lg"
            errorMessage="Błąd przesyłu danych formularza"
          >
            <UserForm handlePrintForm={handlePrintForm} mode="edit" />
          </SuspenseErrorBoundary>
        </>
      )}
    </>
  );
};

export default UserSettings;
