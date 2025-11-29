"use client";

import { Button } from "@/components/shared";
import { UserCommitteeInfo } from "@/types/user";
import { useState } from "react";
import FormsOfTypeList from "./FormsOfTypeList";
import { FormSerialized } from "@/types/form";

type Props = {
  committee: UserCommitteeInfo
  getForms: (committee: UserCommitteeInfo) => Promise<FormSerialized[]>
}

const ContactCommitteeItem = ({ committee, getForms }: Props) => {
  const {
    committeeName, committeeUnion, committeePhone, committeeEmail
  } = committee

  const [showDetails, setShowDetails] = useState<boolean>(false)
  const [forms, setForms] = useState<FormSerialized[]>([])

  const onShowForms = async () => {
    setShowDetails(!showDetails)
    if (showDetails) return
    const committeeForms = await getForms(committee)
    setForms(committeeForms)
  }

  return (
    <div className="mb-8 p-4 border">
      <div>{committeeName}</div>
      <div>{committeeUnion}</div>
      <div>{committeePhone}</div>
      <div>{committeeEmail}</div>

      <Button
        onClickAction={onShowForms}
        message={showDetails ? "Ukryj formularze" : "Pokaz formularze"}
      />

      {showDetails && <FormsOfTypeList forms={forms} />}
    </div>
  );
};

export default ContactCommitteeItem;
