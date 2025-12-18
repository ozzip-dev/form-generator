"use client";

import {
  useActionState,
  useState,
  startTransition,
  SetStateAction,
  Dispatch,
  useEffect,
} from "react";
import {
  ProtocolSerialized,
  ProtocolWithFilesSerialized,
} from "@/types/protocol";
import { formatDateAndTime } from "@/helpers/dates/formatDateAndTime";
import Link from "next/link";

import { Button, FullscreenLoader } from "@/components/shared";
import ProtocolListItemDetails from "./ProtocolListItemDetails";
import { getProtocolDetailsAction } from "@/actions/protocol/getProtocolDetails.Action";

type Props = {
  setPending: Dispatch<SetStateAction<boolean>>;
  protocol: ProtocolSerialized;
};

const ProtocolListItem = ({ setPending, protocol }: Props) => {
  const [details, setDetails] = useState<ProtocolWithFilesSerialized | null>(
    null
  );
  const [_state, fetchDetails, isPending] = useActionState(async () => {
    if (details) {
      setDetails(null);
      return null;
    }
    const result = await getProtocolDetailsAction(_id);
    if (result) setDetails(result);
    return result;
  }, null);

  useEffect(() => {
    setPending(isPending);
  }, [isPending, setPending]);

  const { _id, branch, tradeUnionName, workplaceName, disputeStartDate } =
    protocol;

  return (
    <>
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
