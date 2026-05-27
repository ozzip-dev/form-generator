import { Button, Card } from "@/components/shared";
import { useProtocol } from "@/context/ProtocolContext";
import { formatDateAndTime } from "@/helpers/dates/formatDateAndTime";
import { use } from "react";
import { mapDisputeReason } from "../utils";
import DetailsPrinter from "@/components/shared/DetailsPrinter";
import SectionHeader from "@/components/shared/SectionHeader";

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
    demands,
    disputeStartDate,
    tradeUnionName,
    tradeUnionOrganization,
    workplaceName,
  } = protocol;

  const displayDisputeReasons = Object.values(disputeReason)
    .filter((reason) => reason && reason !== "")
    .map((reason) => mapDisputeReason[reason] ?? reason)
    .join(", ");

  const safeDisplayDate = (date?: string) =>
    date ? formatDateAndTime(date).split(",")[0] : "—";

  const protocolDetails = [
    {
      label: "Data rozpoczęcia sporu:",
      value: safeDisplayDate(disputeStartDate),
    },
    {
      label: "Branża:",
      value: branch,
    },
    {
      label: "Nazwa związku:",
      value: tradeUnionName,
    },
    {
      label: "Organizacja zakładowa:",
      value: tradeUnionOrganization,
    },
    {
      label: "Nazwa przedsiębiorstwa:",
      value: workplaceName,
    },
    {
      label: "Przyczyna rozpoczęcia sporu:",
      value: displayDisputeReasons,
    },
    {
      label: "Konkretne żądania:",
      value: demands?.join(", ") || "-",
    },
  ];

  return (
    <Card>
      <SectionHeader message="Dane sporu zbiorowego" />
      {protocolDetails.map((item, idx) => {
        return (
          <DetailsPrinter
            key={idx}
            {...{ ...item, labelClassName: "w-[22rem] md:text-right" }}
          />
        );
      })}
      <Button
        message="Edytuj"
        type="button"
        variant="primary-rounded"
        onClickAction={props.handlePrintForm}
        className="m-auto w-full sm:w-fit"
      />{" "}
    </Card>
  );
};

export default ProtocolDetails;
