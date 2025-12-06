import { formatDateAndTime } from "@/helpers/dates/formatDateAndTime";
import { Protocol } from "@/types/protocol";
import { mapDisputeReason } from "./utils";

const ProtocolDetails = (props: Partial<Protocol>) => {
  const {
    branch,
    disputeReason,
    disputeStartDate,
    tradeUnionName,
    lastModifiedAt,
    uploadedAt,
    workplaceName
  } = props

  const displayDisputeReasons = disputeReason?.map((reason) => mapDisputeReason[reason]).join(', ')
  const displayDate = (date: Date) => formatDateAndTime(date.toISOString())

  return (
    <div>
      <div className="text-lg font-black">Dane protokołu:</div>
      <div>
        <div><span className="font-black">Branza: </span>{branch}</div>
        <div><span className="font-black">Powod sporu: </span>{displayDisputeReasons}</div>
        <div><span className="font-black">Nazwa związku: </span>{tradeUnionName}</div>
        <div><span className="font-black">Nazwa zakładu: </span>{workplaceName}</div>
        <div><span className="font-black">Data sporu: </span>{displayDate(disputeStartDate!)}</div>
        <div><span className="font-black">Data dodania protokołu: </span>{displayDate(uploadedAt!)}</div>
        <div><span className="font-black">Data ostatniej edycji: </span>{displayDate(lastModifiedAt!)}</div>
      </div>
    </div>
  );
};

export default ProtocolDetails;
