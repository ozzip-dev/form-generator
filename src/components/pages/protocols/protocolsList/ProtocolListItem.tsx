"use client";

import { useActionState, useState, startTransition } from "react";
import {
  ProtocolSerialized,
  ProtocolWithFilesSerialized,
} from "@/types/protocol";
import { formatDateAndTime } from "@/helpers/dates/formatDateAndTime";
import Link from "next/link";
import { getProtocolDetails } from "@/actions/protocol/getProtocolDetails";
import { Button, FullscreenLoader } from "@/components/shared";
import ProtocolListItemDetails from "./ProtocolListItemDetails";

const ProtocolListItem = (protocol: ProtocolSerialized) => {
  const [details, setDetails] = useState<ProtocolWithFilesSerialized | null>(
    null
  );
  const [_state, fetchDetails, isPending] = useActionState(async () => {
    if (details) {
      setDetails(null);
      return null;
    }
    const result = await getProtocolDetails(_id);
    if (result) setDetails(result);
    return result;
  }, null);

  const { _id, branch, tradeUnionName, workplaceName, disputeStartDate } =
    protocol;

  return (
    <>
      {isPending && <FullscreenLoader />}
      <div className="contents">
        <div>{branch}</div>
        <div>{tradeUnionName}</div>
        <div>{workplaceName}</div>
        <div>{formatDateAndTime(disputeStartDate)}</div>
        <div className="flex gap-2">
          <Button
            message={details ? "Ukryj info" : "Pokaz info"}
            onClickAction={() => startTransition(fetchDetails)}
            isLoading={isPending}
          />
          <Link href={`/protocols/${_id}`}>
            <b>Edytuj</b>
          </Link>
        </div>
      </div>

      {details && <ProtocolListItemDetails {...details} />}
    </>
  );
};

export default ProtocolListItem;
