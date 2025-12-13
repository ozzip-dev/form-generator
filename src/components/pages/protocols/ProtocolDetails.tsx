import { formatDateAndTime } from "@/helpers/dates/formatDateAndTime";
import { Protocol } from "@/types/protocol";
import { mapDisputeReason } from "./utils";
import { Button } from "@/components/shared";
import { useProtocol } from "@/context/ProtocolContext";
import { use } from "react";

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
    fileIds,
  } = protocol;

  const displayDisputeReasons = Object.values(disputeReason)
    .filter((reason) => reason && reason !== "")
    .map((reason) => mapDisputeReason[reason] ?? reason)
    .join(", ");

  const displayDate = (date: Date) => formatDateAndTime(date);

  // TODO: przerobic
  return (
    <div>
      <div className="text-lg font-black">Dane sporu zbiorowego:</div>
      <div>
        <div>
          <span className="font-black">Branza: </span>
          {branch}
        </div>
        <div>
          <span className="font-black">Powod sporu: </span>
          {displayDisputeReasons}
        </div>
        <div>
          <span className="font-black">Nazwa związku: </span>
          {tradeUnionName}
        </div>
        <div>
          <span className="font-black">Nazwa zakładu: </span>
          {workplaceName}
        </div>
        <div>
          <span className="font-black">Data rozpoczęcia sporu: </span>
          {/* {displayDate(disputeStartDate!)} */}
          {disputeStartDate!}
        </div>
        <div>
          <span className="font-black">Data dodania protokołu: </span>
          {uploadedAt!}
        </div>
        <div>
          <span className="font-black">Data ostatniej edycji: </span>
          {lastModifiedAt!}
        </div>
      </div>
      <Button
        message="Edytuj dane protokołu"
        type="button"
        onClickAction={props.handlePrintForm}
      />{" "}
    </div>
  );
};

export default ProtocolDetails;
