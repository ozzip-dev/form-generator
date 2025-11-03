"use client";
import { useState } from "react";
import Button from "./ui/buttons/Button";
import SettingsForm from "./settingsForm/SettingsForm";

type Props = {
  contactDetails: {
    committeeUnion: string;
  };
};

const Settings = (props: Props) => {
  const [isFormPrinted, setFormPrinted] = useState(false);

  const handlePrintForm = () => {
    setFormPrinted((prev) => !prev);
  };

  if (!props.contactDetails.committeeUnion) {
    return (
      <>
        <div>Brak danych kontaktowych</div>

        <SettingsForm />
      </>
    );
  }

  return (
    <>
      {!isFormPrinted && <div> {props.contactDetails.committeeUnion}</div>}
      {isFormPrinted && <SettingsForm />}{" "}
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

export default Settings;
