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
import { Button, ButtonLink } from "@/components/shared";
import ProtocolListItemDetails from "./ProtocolListItemDetails";

type Props = {
  protocol: ProtocolSerialized;
};

const ProtocolListItem = (props: Props) => {
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
    props.protocol;

  return (
    <>
      <div className="md:flex">
        <div className="md:flex md:w-4/6">
          <div className="flex md:flex-1">
            <div className="w-1/2 md:hidden font-bold">Branża</div>{" "}
            <div>{branch}</div>
          </div>
          <div className="flex md:flex-1">
            <div className="w-1/2 md:hidden font-bold">Nazwa związku</div>{" "}
            <div>{tradeUnionName}</div>
          </div>
          <div className="flex md:flex-1">
            <div className="w-1/2 md:hidden font-bold">Nazwa zakładu</div>{" "}
            <div>{workplaceName}</div>
          </div>
          <div className="flex md:flex-1">
            <div className="w-1/2 md:hidden font-bold">Data sporu</div>{" "}
            <div>{formatDateAndTime(disputeStartDate)}</div>
          </div>
        </div>
        <div className="flex justify-between gap-2">
          <Button
            message={isOpen ? "Ukryj info" : "Pokaż info"}
            onClickAction={() => startTransition(fetchDetails)}
            isLoading={isPending && isFetching.current}
            variant="primary-rounded"
          />

          <ButtonLink
            message={"Edytuj"}
            link={`/protocols/${_id}`}
            className="btn-primary btn-primary-rounded text-white !bg-accent"
          />
        </div>
      </div>

      <div className="">
        <div
          className={`
          grid overflow-hidden transition-all 
          duration-700
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
