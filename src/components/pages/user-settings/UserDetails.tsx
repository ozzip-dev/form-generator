import { Button } from "@/components/shared";
import React from "react";

type Props = {
  handlePrintForm: () => void;
  contactDetails: any;
};

const UserDetails = (props: Props) => {
  const { committeeUnion, committeeName, committeePhone, committeeEmail } =
    props.contactDetails;

  const dataUserDetails: { header: string; detail: string }[] = [
    {
      header: "Związek zawodowy do którego należy komisja",
      detail: committeeUnion,
    },
    { header: "Nazwa komisji", detail: committeeName },
    { header: "Telefon kontaktowy komisji", detail: committeePhone },
    { header: "Email kontaktowy komisji", detail: committeeEmail },
  ];

  return (
    <>
      <div className="flex justify-center ">
        <div className="w-4/5">
          {dataUserDetails.map(({ header, detail }) => {
            return (
              <React.Fragment key={header}>
                <div className="text-lg block text-xl !important">{header}</div>
                <div className="w-full border-b-2 border-transparent px-2 py-1 mb-4">
                  {detail ? detail : <span className="text-red-500">Brak</span>}
                </div>{" "}
              </React.Fragment>
            );
          })}
          <Button
            message="Edytuj dane kontaktowe"
            type="button"
            onClickAction={props.handlePrintForm}
          />{" "}
        </div>
      </div>
    </>
  );
};

export default UserDetails;
