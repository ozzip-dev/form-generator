import { Button } from "@/components/shared";
import Card from "@/components/shared/Card";
import DetailsPrinter from "@/components/shared/DetailsPrinter";
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
      header: "Nazwa związku zawodowego:",
      detail: committeeUnion,
    },
    { header: "Nazwa struktury związku:", detail: committeeName },
    { header: "Telefon kontaktowy struktury:", detail: committeePhone },
    { header: "Email kontaktowy struktury:", detail: committeeEmail },
  ];

  return (
    <>
      <div className="flex flex-col gap-2">
        <Card>
          <div className="font-bold mb-7">Dane kontaktowe</div>
          {dataUserDetails.map(({ header, detail }) => {
            return <DetailsPrinter label={header} value={detail} />;
          })}
        </Card>

        <Button
          message="Edytuj"
          type="button"
          onClickAction={props.handlePrintForm}
          className="m-auto mt-16"
        />
      </div>
    </>
  );
};

export default UserDetails;
