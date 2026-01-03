import { Button } from "@/components/shared";
import Card from "@/components/shared/Card";
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
      <Card>
        <div className="font-bold mb-7">Dane kontaktowe</div>
        <div className="flex flex-col gap-8">
          {dataUserDetails.map(({ header, detail }) => {
            return (
              <div key={header} className="text-sm">
                <div className="font-bold mb-1">{header}</div>
                <div className="p-3 mb-4 border border-transparent">
                  {detail ? detail : <span className="text-red-500">Brak</span>}
                </div>{" "}
              </div>
            );
          })}
        </div>
      </Card>

      <Button
        message="Edytuj"
        type="button"
        onClickAction={props.handlePrintForm}
        className="m-auto mt-16"
      />
    </>
  );
};

export default UserDetails;
