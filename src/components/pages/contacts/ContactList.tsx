"use client";

import { CommitteeInfoKey, UserCommitteeInfo } from "@/types/user";
import ContactCommitteeItem from "./ContactCommitteeItem";
import ContactFilters from "./ContactFilters";
import { FormSerialized } from "@/types/form";
import { useState } from "react";
import ResponsiveListHeader from "@/components/shared/responsiveList/ResponsiveListHeader";
import { mapDisputeReason } from "../protocols/utils";
import { FormType } from "@/enums/form";
import { formTypesWithLabels } from "@/helpers/formHelpers";

const headers = ["Związek", "Struktura", "Telefon", "Email"];

type Props = {
  committees: UserCommitteeInfo[];
  getForms: (committee: UserCommitteeInfo) => Promise<FormSerialized[]>;
};

const ContactList = ({ committees, getForms }: Props) => {
  const [filterText, setFilterText] = useState<string>("");
  const [visibleCategory, setVisibleCategory] = useState(
    formTypesWithLabels[0].value
  );

  const filteredCommittees = committees.filter((committee) => {
    const keys = Object.keys(committee);
    return keys.some((key) =>
      committee[key as CommitteeInfoKey]
        .toLowerCase()
        .includes(filterText.toLowerCase())
    );
  });

  const handleReasonSelect = () => {
    return;
  };

  const formsReasons = formTypesWithLabels.map(({ label }) => {
    return label;
  });

  if (!committees || committees.length === 0)
    return (
      <div className="text-error text-center">Brak kontaktów organizacji</div>
    );

  return (
    <div>
      <ul className="flex gap-8">
        {formsReasons.map((reason) => {
          return (
            <li key={reason} onClick={handleReasonSelect}>
              {reason}
            </li>
          );
        })}
      </ul>
      <ContactFilters {...{ filterText, setFilterText }} />
      <div className=" flex flex-col gap-6">
        <ResponsiveListHeader headers={headers} />

        {filteredCommittees.map((committee, i) => (
          <ContactCommitteeItem
            {...{ committee, getForms }}
            key={committee.committeeEmail}
          />
        ))}
      </div>
    </div>
  );
};

export default ContactList;
