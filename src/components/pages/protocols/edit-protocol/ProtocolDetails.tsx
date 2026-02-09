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
      label: "Data rozpoczęcia sporu:",
      value: safeDisplayDate(disputeStartDate),
      labelClassName: "w-[22rem] md:text-right"
    },
    {
      label: "Branża:",
      value: branch,
      labelClassName: "w-[22rem] md:text-right"
    },
    {
      label: "Nazwa związku:",
      value: tradeUnionName,
      labelClassName: "w-[22rem] md:text-right"
    },
    {
      label: "Nazwa przedsiębiorstwa:",
      value: workplaceName,
      labelClassName: "w-[22rem] md:text-right"
    },
    {
      label: "Przyczyna rozpoczęcia sporu:",
      value: displayDisputeReasons,
      labelClassName: "w-[22rem] md:text-right"
    },
  ];



  return (
    <Card>
      <SectionHeader message="Dane sporu zbiorowego" />
      {protocolDetails.map((item, idx) => {
        return (
          <DetailsPrinter key={idx} {...item} />
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
