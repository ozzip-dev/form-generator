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
  useRef,
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
  const isFetching = useRef(false);

  const toggleProtocolDetails = async () => {
    setIsOpen((prev) => !prev);
    if (details) return;

    isFetching.current = true;
    const result = await getProtocolDetailsAction(_id);
    if (result) {
      setDetails(result);
    }
    isFetching.current = false;
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
            message={isOpen ? "Ukryj info" : "Pokaż info"}
            onClickAction={() => startTransition(fetchDetails)}
            isLoading={isPending && isFetching.current}
          />
          <Link className="btn btn-primary m-auto" href={`/protocols/${_id}`}>
            Edytuj
          </Link>
        </div>
      </div>
      <div
        className={`transition-all duration-700 ${
          isOpen ? "col-span-5" : "hidden"
        }`}
      >
        <div className="min-h-0">
          {details && <ProtocolListItemDetails {...details} />}
        </div>
      </div>
    </>
  );
};

export default ProtocolListItem;
