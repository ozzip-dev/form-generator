"use client";

import { useState } from "react";
import UserDetails from "./UserDetails";
import UserForm from "./UserForm";
import { SuspenseErrorBoundary } from "@/components/shared";

const UserSettings = () => {
  const [isFormPrinted, setFormPrinted] = useState(false);

  const handlePrintForm = () => {
    setFormPrinted((prev) => !prev);
  };

  return (
    <>
      <div>Dane kontaktowe</div>
      {!isFormPrinted && <UserDetails handlePrintForm={handlePrintForm} />}
      {isFormPrinted && (
        <SuspenseErrorBoundary
          size="lg"
          errorMessage="Błąd przesyłu danych formularza"
        >
          <UserForm handlePrintForm={handlePrintForm} />
        </SuspenseErrorBoundary>
      )}{" "}
      <div className="w-fit ml-auto"></div>
    </>
  );
};

export default UserSettings;
