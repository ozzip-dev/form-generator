"use client";

import { formatDateAndTime } from "@/helpers/dates/formatDateAndTime";
import {
  ProtocolSerialized,
  ProtocolWithFilesSerialized,
} from "@/types/protocol";
import { startTransition, useActionState, useRef, useState } from "react";

import { getProtocolDetailsAction } from "@/actions/protocol/getProtocolDetailsAction";
import { Button, ButtonLink } from "@/components/shared";
import ResponsiveList from "@/components/shared/responsiveList/ResponsiveList";
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

  const dataProtocolsList = {
    "Branża:": branch,
    "Nazwa związku:": tradeUnionName,
    "Nazwa zakładu:": workplaceName,
    "Data sporu:": formatDateAndTime(disputeStartDate).split(",")[0],
  };

  return (
    <div className="relative">
      <div className=" md:flex items-center">
        <ResponsiveList listItems={dataProtocolsList} />

        <div className="flex justify-between gap-2 mt-8 md:mt-0">
          <Button
            message={isOpen ? "Ukryj" : "Pokaż"}
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
      <div className="absolute border-b w-full -bottom-2 left-0"></div>
    </div>
  );
};

export default ProtocolListItem;
