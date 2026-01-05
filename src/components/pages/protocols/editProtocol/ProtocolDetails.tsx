import { Button } from "@/components/shared";
import { useProtocol } from "@/context/ProtocolContext";
import { formatDateAndTime } from "@/helpers/dates/formatDateAndTime";
import { use } from "react";
import { mapDisputeReason } from "../utils";
import Card from "@/components/shared/Card";
import DetailsPrinter from "@/components/shared/DetailsPrinter";

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

  const safeDisplayDate = (date?: string) => {
    return date ? formatDateAndTime(date).split(",")[0] : "—";
  };

  // TODO: przerobic

  const protocolDetails = [
    {
      staticLabel: "Data rozpoczęcia sporu:",
      value: safeDisplayDate(disputeStartDate),
    },
    { staticLabel: "Branża:", value: branch },
    { staticLabel: "Nazwa związku:", value: tradeUnionName },
    { staticLabel: "Nazwa przedsiębiorstwa:", value: workplaceName },
    {
      staticLabel: "Przyczyna rozpoczęcia sporu:",
      value: displayDisputeReasons,
    },
  ];

  const editionDetails = [
    {
      staticLabel: "Dodano:",
      value: safeDisplayDate(uploadedAt),
    },
    {
      staticLabel: "Edytowano:",
      value: safeDisplayDate(lastModifiedAt),
    },
  ];

  return (
    <Card>
      <div className="text-center md:text-left text-lg font-bold mb-6">
        Dane sporu zbiorowego
      </div>

      {protocolDetails.map(({ staticLabel, value }) => {
        return (
          <DetailsPrinter key={staticLabel} label={staticLabel} value={value} />
        );
      })}

      <div className="md:flex gap-4">
        {editionDetails.map(({ staticLabel, value }) => {
          return (
            <DetailsPrinter
              key={staticLabel}
              label={staticLabel}
              value={value}
            />
          );
        })}
      </div>

      <div className="w-fit m-auto">
        <Button
          message="Edytuj"
          type="button"
          onClickAction={props.handlePrintForm}
        />{" "}
      </div>
    </Card>
  );
};

export default ProtocolDetails;
