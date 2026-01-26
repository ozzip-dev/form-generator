"use client";

import { Button } from "@/components/shared";
import { UserCommitteeInfo } from "@/types/user";
import { useState } from "react";
import FormsOfTypeList from "./FormsOfTypeList";
import { FormSerialized } from "@/types/form";
import ResponsiveList from "@/components/shared/responsiveList/ResponsiveList";
import { FormType } from "@/enums/form";

type Props = {
  committee: UserCommitteeInfo;
  type: FormType;
  getForms: (
    committee: UserCommitteeInfo,
    formType: FormType,
  ) => Promise<FormSerialized[]>;
};

const ContactCommitteeItem = ({ committee, type, getForms }: Props) => {
  const { committeeName, committeeUnion, committeePhone, committeeEmail } =
    committee;

  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [forms, setForms] = useState<FormSerialized[]>([]);

  const onShowForms = async () => {
    setShowDetails(!showDetails);
    if (showDetails) return;
    const committeeForms = await getForms(committee, type);
    setForms(committeeForms);
  };

  const message = showDetails ? "Ukryj formularze" : "Pokaż formularze";

  const dataOrganizations = {
    "Związek:": committeeName,
    "Organizacja:": committeeUnion,
    "Telefon:": committeePhone,
    "Email:": committeeEmail,
  };

  return (
    <div className=" w-full">
      <ResponsiveList listItems={dataOrganizations} />

      <Button
        onClickAction={onShowForms}
        message={message}
        variant="primary-rounded"
        className="mt-4"
      />

      {showDetails && <FormsOfTypeList forms={forms} />}
    </div>
  );
};

export default ContactCommitteeItem;
