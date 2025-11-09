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

        <UserForm />
      </>
    );
  }

  return (
    <>
      {/* TODO: ten komponent ma podpietą akcję, dogramy wszystko w całość */}
      <UserCommitteeForm />

      {!isFormPrinted && <UserDetails />}
      {isFormPrinted && <UserForm />}{" "}
      <div className="w-fit ml-auto">

        <Button
          message="Edytuj dane kontaktowe"
          type="button"
          onClickAction={handlePrintForm}
        />{" "}
      </div>
    </>
  );
};

export default UserSettings;
