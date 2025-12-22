"use client";

import { formatDateAndTime } from "@/helpers/dates/formatDateAndTime";
import {
  ProtocolSerialized,
  ProtocolWithFilesSerialized,
} from "@/types/protocol";
import Link from "next/link";
import {
  Dispatch,
  SetStateAction,
  startTransition,
  useActionState,
  useState,
} from "react";

import { getProtocolDetailsAction } from "@/actions/protocol/getProtocolDetailsAction";
import { Button } from "@/components/shared";
import ProtocolListItemDetails from "./ProtocolListItemDetails";

type Props = {
  setPending: Dispatch<SetStateAction<boolean>>;
  protocol: ProtocolSerialized;
};

const ProtocolListItem = ({ setPending, protocol }: Props) => {
  const [details, setDetails] = useState<ProtocolWithFilesSerialized | null>(
    null
  );
  const [isOpen, setIsOpen] = useState(false);
  const animationDuration = 700;

  const toggleProtocolDetails = async () => {
    if (details) {
      setIsOpen(false);
      setTimeout(() => {
        setDetails(null);
      }, animationDuration);

      return null;
    }
    const result = await getProtocolDetailsAction(_id);
    if (result) {
      setDetails(result);
      requestAnimationFrame(() => setIsOpen(true));
    }
    return result;
  };
  const [_, fetchDetails, isPending] = useActionState(
    toggleProtocolDetails,
    null
  );

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
            message={details ? "Ukryj info" : "Pokaż info"}
            onClickAction={() => startTransition(fetchDetails)}
            isLoading={isPending}
          />
          <Link href={`/protocols/${_id}`}>
            <b>Edytuj</b>
          </Link>
        </div>
      </div>
      <div className="group ">
        <div
          className={`
          grid overflow-hidden transition-all 
          duration-${animationDuration}
          ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}
        `}
        >
          <div className="min-h-0">
            {details && <ProtocolListItemDetails {...details} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProtocolListItem;
