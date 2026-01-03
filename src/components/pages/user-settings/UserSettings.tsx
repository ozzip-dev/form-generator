"use client";

import { useState } from "react";
import UserDetails from "./UserDetails";
import UserForm from "./UserForm";
import { SuspenseErrorBoundary } from "@/components/shared";
import UserDetailTest from "./UserActionTest";
import Card from "@/components/shared/Card";

const UserSettings = () => {
  const [isFormPrinted, setFormPrinted] = useState(false);

  const handlePrintForm = () => {
    setFormPrinted((prev) => !prev);
  };

  return (
    <Card>
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
          <SuspenseErrorBoundary
            size="lg"
            errorMessage="Błąd przesyłu danych formularza"
          >
            <UserForm handlePrintForm={handlePrintForm} />
          </SuspenseErrorBoundary>
          {/* <>
            <UserDetailTest handlePrintForm={handlePrintForm} />
          </> */}
        </>
      )}{" "}
      <div className="w-fit ml-auto"></div>
    </Card>
  );
};

export default UserSettings;
