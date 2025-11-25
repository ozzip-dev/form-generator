import { Button } from "@/components/shared";
import { useUser } from "@/context/UserContextProvider";
import React, { use } from "react";

type Props = {
  handlePrintForm: () => void;
};

const UserDetails = (props: Props) => {
  const { userPromise } = useUser();
  const user: any = use(userPromise);

  const { committeeUnion, committeeName, committeePhone, committeeEmail } =
    user;

  const dataUserDetails: { header: string; detail: string }[] = [
    {
      header: "Nazwa związku zawodowego",
      detail: committeeUnion,
    },
    { header: "Nazwa struktury związku", detail: committeeName },
    { header: "Telefon kontaktowy struktury", detail: committeePhone },
    { header: "Email kontaktowy struktury", detail: committeeEmail },
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
