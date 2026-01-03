import { Button } from "@/components/shared";
import { useProtocol } from "@/context/ProtocolContext";
import { formatDateAndTime } from "@/helpers/dates/formatDateAndTime";
import { use } from "react";
import { mapDisputeReason } from "../utils";

type Props = {
  handlePrintForm: () => void;
};

const ProtocolDetails = (props: Props) => {
  const { protocolPromise } = useProtocol();
  const protocol = use(protocolPromise);
  if (!protocol) {
    return <div>Nie znaleziono protokołu</div>;
  }

  const {
    branch,
    disputeReason,
    disputeStartDate,
    tradeUnionName,
    lastModifiedAt,
    uploadedAt,
    workplaceName,
  } = protocol;

  const displayDisputeReasons = Object.values(disputeReason)
    .filter((reason) => reason && reason !== "")
    .map((reason) => mapDisputeReason[reason] ?? reason)
    .join(", ");

  const safeDisplayDate = (date?: string) =>
    date ? formatDateAndTime(date) : "—";

  // TODO: przerobic

  const protocolDetails = [
    { staticLabel: "Branza:", value: branch },
    { staticLabel: "Powod sporu:", value: displayDisputeReasons },
    { staticLabel: "Nazwa związku:", value: tradeUnionName },
    { staticLabel: "Nazwa zakładu:", value: workplaceName },
    {
      staticLabel: "Data rozpoczęcia sporu:",
      value: safeDisplayDate(disputeStartDate),
    },
    { staticLabel: "Data dodania protokołu:", value: safeDisplayDate(uploadedAt) },
    { staticLabel: "Data ostatniej edycji:", value: safeDisplayDate(lastModifiedAt) },
  ];

  return (
    <div className="shadow-border-box p-lg">
      <div className="grid grid-cols-2 *:pb-md">
        <div className="text-lg font-black col-span-2">
          Dane sporu zbiorowego:
        </div>
        {protocolDetails.map(({ staticLabel, value }) => {
          return (
            <div key={staticLabel}>
              <span className="font-black">{staticLabel} </span>
              {value}
            </div>
          );
        })}
      </div>
      <Button
        message="Edytuj"
        type="button"
        onClickAction={props.handlePrintForm}
      />{" "}
    </div>
  );
};

export default ProtocolDetails;
