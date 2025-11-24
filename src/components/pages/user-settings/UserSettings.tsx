"use client";

import { useState } from "react";
import UserDetails from "./UserDetails";
import UserForm from "./UserForm";

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
        <UserForm
          handlePrintForm={handlePrintForm}
          contactDetails={props.userDetails}
        />
      )}{" "}
      <div className="w-fit ml-auto"></div>
    </>
  );
};

export default UserSettings;
