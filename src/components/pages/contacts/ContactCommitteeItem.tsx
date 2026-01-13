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
    <div className=" w-full">
      <ResponsiveList listItems={dataOrganizations} />

      {/* To do forms links */}
      {/* {showDetails && <FormsOfTypeList forms={forms} />} */}
    </div>
  );
};

export default ContactCommitteeItem;
