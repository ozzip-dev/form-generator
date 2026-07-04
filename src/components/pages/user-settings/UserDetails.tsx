import {
  Button,
  Card,
  DetailsPrinter,
  SectionHeader,
} from "@/components/shared";
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
      <div className="">
        <Card>
          <SectionHeader message="Dane kontaktowe:" headerTag="h1" />

          {dataUserDetails.map(({ header, detail }) => {
            return (
              <DetailsPrinter
                key={header}
                label={header}
                value={detail}
                labelClassName="w-[22rem]"
              />
            );
          })}
        </Card>

        <Button
          message="Edytuj"
          type="button"
          onClickAction={props.handlePrintForm}
          className="m-auto mt-10 w-full sm:w-fit"
          variant="primary-rounded"
        />
      </div>
    </>
  );
};

export default UserDetails;
