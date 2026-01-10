"use client";

import { CommitteeInfoKey, UserCommitteeInfo } from "@/types/user";
import ContactCommitteeItem from "./ContactCommitteeItem";
import ContactFilters from "./ContactFilters";
import { FormSerialized } from "@/types/form";
import { useState } from "react";
import ResponsiveListHeader from "@/components/shared/responsiveList/ResponsiveListHeader";

const headers = ["Związek", "Struktura", "Telefon", "Email"];

type Props = {
  committees: UserCommitteeInfo[];
  getForms: (committee: UserCommitteeInfo) => Promise<FormSerialized[]>;
};

const ContactList = ({ committees, getForms }: Props) => {
  const [filterText, setFilterText] = useState<string>("");

  const filteredCommittees = committees.filter((committee) => {
    const keys = Object.keys(committee);
    return keys.some((key) =>
      committee[key as CommitteeInfoKey]
        .toLowerCase()
        .includes(filterText.toLowerCase())
    );
  });

  if (!committees || committees.length === 0)
    return (
      <div className="text-error text-center">Brak kontaktów organizacji</div>
    );

  return (
    <div>
      <ContactFilters {...{ filterText, setFilterText }} />
      <div className=" flex flex-col gap-6">
        <div className="md:w-4/5">
          <ResponsiveListHeader headers={headers} />
        </div>

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
