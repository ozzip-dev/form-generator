"use client";

import { formatDateAndTime } from "@/helpers/dates/formatDateAndTime";
import {
  ProtocolSerialized,
  ProtocolWithFilesSerialized,
} from "@/types/protocol";
import { startTransition, use, useActionState, useRef, useState } from "react";

import { getProtocolDetailsAction } from "@/actions/protocol";
import { Button, ButtonLink, Icon, IconTrash } from "@/components/shared";
import ResponsiveList from "@/components/shared/responsive-list/ResponsiveList";
import ProtocolListItemDetails from "./ProtocolListItemDetails";
import { isProtocolAuthor } from "@/helpers/protocolHelpers";
import { UserSerialized } from "@/types/user";
import { useUser } from "@/context/UserContextProvider";
import RemoveProtocolBtn from "./RemoveProtocolBtn";
import { mapDisputeReason } from "../utils";

type Props = {
  protocol: ProtocolSerialized;
};

const ProtocolListItem = (props: Props) => {
  const [details, setDetails] = useState<ProtocolWithFilesSerialized | null>(
    null,
  );
  const [isOpen, setIsOpen] = useState(false);
  const isFetching = useRef(false);

  const { userPromise } = useUser();
  const user: UserSerialized | null = use(userPromise);

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
    null,
  );

  const {
    _id,
    branch,
    tradeUnionName,
    workplaceName,
    disputeStartDate,
    disputeReason,
  } = props.protocol;

  const disputeReasons = Object.values(disputeReason)
    .filter(Boolean)
    .map((reason) => mapDisputeReason[reason])
    .join(", ");

  const dataProtocolsList = {
    "Branża:": branch,
    "Nazwa związku:": tradeUnionName,
    "Nazwa zakładu:": workplaceName,
    "Początek sporu:": formatDateAndTime(disputeStartDate).split(",")[0],
    "Przyczyna sporu": disputeReasons,
  };

  const isAuthor = user && isProtocolAuthor(user, props.protocol);

  return (
    <div className="relative">
      <div className="items-center md:flex">
        <div className="md:w-full">
          <ResponsiveList listItems={dataProtocolsList} truncateText={false} />
        </div>

        <div className="mb-2 mt-8 flex justify-between md:mt-0 md:w-[15%]">
          <Button
            icon={
              isOpen ? (
                <Icon
                  icon="folder-open"
                  size={20}
                  color="var(--color-font_light)"
                />
              ) : (
                <Icon
                  icon="folder-closed"
                  size={20}
                  color="var(--color-accent)"
                />
              )
            }
            variant="ghost"
            onClickAction={() => startTransition(fetchDetails)}
            isLoading={isPending && isFetching.current}
          />

          {isAuthor && (
            <>
              <ButtonLink
                icon={
                  <Icon icon="edit" size={20} color="var(--color-accent)" />
                }
                link={`/protocols/${_id}`}
                variant="ghost"
              />

              <RemoveProtocolBtn ProtocolId={props.protocol._id} />
            </>
          )}
        </div>
      </div>

      <div
        className={`grid overflow-hidden transition-all duration-700 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"} `}
      >
        <div className="min-h-0">
          {details && <ProtocolListItemDetails {...details} />}
        </div>
      </div>

      <div className="absolute -bottom-2 left-0 w-full border-b"></div>
    </div>
  );
};

export default ProtocolListItem;
