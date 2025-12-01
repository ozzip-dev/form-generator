"use client"

import { CommitteeInfoKey, UserCommitteeInfo } from "@/types/user"
import CommitteeHeaders from "./CommitteeContactsHeaders"
import ContactCommitteeItem from "./ContactCommitteeItem"
import ContactFilters from "./ContactFilters"
import { FormSerialized } from "@/types/form"
import { useState } from "react"

type Props = {
  committees: UserCommitteeInfo[]
  getForms: (committee: UserCommitteeInfo) => Promise<FormSerialized[]>
}

const ContactList = ({ committees, getForms }: Props) => {
  const [filterText, setFilterText] = useState<string>('');

  const filteredCommittees = committees
    .filter((committee) => {
      const keys = Object.keys(committee)
      return keys.some((key) => committee[key as CommitteeInfoKey].toLowerCase().includes(filterText.toLowerCase()))
    })
    
  return (
    <div>
      <ContactFilters {...{ filterText, setFilterText }} />
      <div
        className="
          *:grid *:grid-cols-[repeat(5,12rem)]
          *:items-center
        "
      >
        <CommitteeHeaders />

        {filteredCommittees.map((committee, i) => (
          <ContactCommitteeItem
            {...{ committee, getForms }} 
            key={i}

          />
        ))}
      </div>
    </div>
  )
}




export default ContactList;
