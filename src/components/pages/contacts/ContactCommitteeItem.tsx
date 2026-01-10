"use client";

import { Button } from "@/components/shared";
import { UserCommitteeInfo } from "@/types/user";
import { useState } from "react";
import FormsOfTypeList from "./FormsOfTypeList";
import { FormSerialized } from "@/types/form";
import ResponsiveList from "@/components/shared/responsiveList/ResponsiveList";

type Props = {
  committee: UserCommitteeInfo;
  getForms: (committee: UserCommitteeInfo) => Promise<FormSerialized[]>;
};

const ContactCommitteeItem = ({ committee, getForms }: Props) => {
  const { committeeName, committeeUnion, committeePhone, committeeEmail } =
    committee;

  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [forms, setForms] = useState<FormSerialized[]>([]);

  const onShowForms = async () => {
    setShowDetails(!showDetails);
    if (showDetails) return;
    const committeeForms = await getForms(committee);
    setForms(committeeForms);
  };

  const dataOrganizations = {
    "Związek:": committeeName,
    "Organizacja:": committeeUnion,
    "Telefon:": committeePhone,
    "Email:": committeeEmail,
  };

  return (
    <div className="md:flex items-center w-full">
      <div className="md:w-4/5">
        <ResponsiveList listItems={dataOrganizations} />
      </div>

      <Button
        onClickAction={onShowForms}
        message={showDetails ? "Ukryj formularze" : "Pokaz formularze"}
        variant="primary-rounded"
      />

      {showDetails && <FormsOfTypeList forms={forms} />}
    </div>
  );
};

export default ContactCommitteeItem;
