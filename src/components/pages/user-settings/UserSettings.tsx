"use client";

import { useState } from "react";
import UserCommitteeForm from "./UserCommitteeForm";
import UserForm from "./UserForm";
import UserDetails from "./UserDetails";
import { Button } from "@/components/shared";

type Props = {
  contactDetails: {
    committeeUnion: string;
  };
};

const UserSettings = (props: Props) => {
  const [isFormPrinted, setFormPrinted] = useState(false);

  const handlePrintForm = () => {
    setFormPrinted((prev) => !prev);
  };

  if (!props.contactDetails.committeeUnion) {
    return (
      <>
        <div>Brak danych kontaktowych</div>

        <UserForm handlePrintForm={handlePrintForm} />
      </>
    );
  }

  return (
    <>
      <div>Dane kontaktowe</div>
      {!isFormPrinted && <UserDetails handlePrintForm={handlePrintForm} />}
      {isFormPrinted && <UserForm handlePrintForm={handlePrintForm} />}{" "}
      <div className="w-fit ml-auto"></div>
    </>
  );
};

export default UserSettings;
