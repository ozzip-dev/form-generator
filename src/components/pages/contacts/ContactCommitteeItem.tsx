"use client";

import { UserCommitteeInfo } from "@/types/user";

const ContactCommitteeItem = ({
  committeeName, committeeUnion, committeePhone, committeeEmail
}: UserCommitteeInfo) => {
  return (
    <div>
      <div>{committeeName}</div>
      <div>{committeeUnion}</div>
      <div>{committeePhone}</div>
      <div>{committeeEmail}</div>
    </div>
  );
};

export default ContactCommitteeItem;
