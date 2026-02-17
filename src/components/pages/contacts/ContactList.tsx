"use client";

import { CommitteeInfoKey, UserCommitteeInfo } from "@/types/user";
import ContactCommitteeItem from "./ContactCommitteeItem";
import ContactFilters from "./ContactFilters";
import { FormSerialized } from "@/types/form";
import { useEffect, useState } from "react";
import ResponsiveListHeader from "@/components/shared/responsive-list/ResponsiveListHeader";
import { FormType } from "@/enums/form";
import { formTypesWithLabels, getTypeLabel } from "@/helpers/formHelpers";
import { Button, Card } from "@/components/shared";

const headers = ["Związek", "Struktura", "Telefon", "Email"];

type Props = {
  type: FormType;
  getUserCommittees: (formType: FormType) => Promise<UserCommitteeInfo[]>;
  getForms: (
    committee: UserCommitteeInfo,
    formType: FormType,
  ) => Promise<FormSerialized[]>;
};

const ContactList = ({ type, getUserCommittees, getForms }: Props) => {
  const [filterText, setFilterText] = useState<string>("");
  const [activeType, setActiveType] = useState<FormType>(type);
  const [committees, setCommittees] = useState<UserCommitteeInfo[]>([]);

  const handleReasonSelect = async (formType: FormType) => {
    setCommittees([]);
    setActiveType(formType);
    const userCommittees = await getUserCommittees(formType);

    setCommittees(userCommittees);
  };

  const filteredCommittees = committees.filter((committee) => {
    const keys = Object.keys(committee);
    return keys.some((key) =>
      committee[key as CommitteeInfoKey]
        .toLowerCase()
        .includes(filterText.toLowerCase()),
    );
  });

  useEffect(() => {
    handleReasonSelect(type);
  }, []);

  return (
    <div>
      {/* TODO: Te same filtry co w Forum. Zmienić/ostylowc w obu */}
      <div className="m-auto flex w-fit flex-wrap items-center gap-x-8 gap-y-4 py-4">
        <div>Typy formularzy: </div>
        {formTypesWithLabels.map(({ label, value }) => (
          <Button
            key={value}
            className={`!px-8 !text-base ${
              value != activeType ? "!bg-accent_dark" : ""
            }`}
            message={label}
            onClickAction={() => handleReasonSelect(value)}
          />
        ))}
      </div>

      <Card>
        <div className="my-6 text-lg">
          <span>Organizacje, które utworzyły formularz typu</span>{" "}
          <span className="font-bold">{getTypeLabel(activeType)}</span>
        </div>

        {!committees || !committees.length ? (
          <div className="pt-2 text-center text-error">
            Brak kontaktów organizacji
          </div>
        ) : (
          <div>
            <ContactFilters {...{ filterText, setFilterText }} />

            <div className="flex flex-col gap-6">
              <ResponsiveListHeader headers={headers} />

              {filteredCommittees.map((committee, i) => (
                <ContactCommitteeItem
                  {...{ committee, getForms, type: activeType }}
                  key={committee.committeeEmail}
                />
              ))}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ContactList;
