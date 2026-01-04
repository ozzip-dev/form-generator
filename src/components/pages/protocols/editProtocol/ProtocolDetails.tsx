import { Button } from "@/components/shared";
import { useProtocol } from "@/context/ProtocolContext";
import { formatDateAndTime } from "@/helpers/dates/formatDateAndTime";
import { use } from "react";
import { mapDisputeReason } from "../utils";
import Card from "@/components/shared/Card";

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
    const transformed = date ? formatDateAndTime(date).split(",")[0] : "—";

    return transformed;
  };

  console.log("safeDisplayDate", safeDisplayDate(disputeStartDate));

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
      staticLabel: "Data dodania protokołu:",
      value: safeDisplayDate(uploadedAt),
    },
    {
      staticLabel: "Data ostatniej edycji:",
      value: safeDisplayDate(lastModifiedAt),
    },
  ];

  return (
    <Card>
      <div className="flex flex-col gap-2">
        <div className="text-lg font-bold mb-6">Dane sporu zbiorowego</div>
        {protocolDetails.map(({ staticLabel, value }, idx) => {
          return (
            <div key={staticLabel} className="text-sm flex items-center gap-4">
              <div className="font-bold mb-1">{staticLabel}</div>
              <div className="p-3 border border-transparent mt-3 mb-4">
                {idx === 0 && <div className="h-[2px] w-[20rem]"> </div>}
                {value}
              </div>
            </div>
          );
        })}
        <div className="flex">
          {editionDetails.map(({ staticLabel, value }, idx) => {
            return (
              <div
                key={staticLabel}
                className="text-sm flex items-center gap-4"
              >
                <div className="font-bold mb-1">{staticLabel}</div>
                <div className="p-3 border border-transparent mt-3 mb-4">
                  {value}
                  {idx === 0 && <div className="h-[2px] w-[20rem]"> </div>}
                </div>
              </div>
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
      </div>
    </Card>
  );
};

export default ProtocolDetails;
