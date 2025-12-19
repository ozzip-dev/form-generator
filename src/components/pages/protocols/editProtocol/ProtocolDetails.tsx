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
    { label: "Branza:", value: branch },
    { label: "Powod sporu:", value: displayDisputeReasons },
    { label: "Nazwa związku:", value: tradeUnionName },
    { label: "Nazwa zakładu:", value: workplaceName },
    {
      label: "Data rozpoczęcia sporu:",
      value: safeDisplayDate(disputeStartDate),
    },
    { label: "Data dodania protokołu:", value: safeDisplayDate(uploadedAt) },
    { label: "Data ostatniej edycji", value: safeDisplayDate(lastModifiedAt) },
  ];

  return (
    <div>
      <div className="text-lg font-black">Dane sporu zbiorowego:</div>
      <ul>
        {protocolDetails.map(({ label, value }) => {
          return (
            <li key={label}>
              <span className="font-black">{label} </span>
              {value}
            </li>
          );
        })}
      </ul>
      <Button
        message="Edytuj dane protokołu"
        type="button"
        onClickAction={props.handlePrintForm}
      />{" "}
    </div>
  );
};

export default ProtocolDetails;
