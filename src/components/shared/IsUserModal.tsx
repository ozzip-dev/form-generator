"use client";

import { use, useEffect, useState } from "react";
import ModalWrapper from "./ModalWrapper";
import Link from "next/link";
import { useUser } from "@/context/UserContextProvider";
import { usePathname, useSearchParams } from "next/navigation";
import { hasCompleteCommitteeData } from "@/helpers/hasCompleteCommitteeData";

const IsUserModal = () => {
  const { userPromise } = useUser();
  const user = use(userPromise);

  const areUserDetails = hasCompleteCommitteeData(user);
  const [areDetails, setAreDetails] = useState(areUserDetails);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("emptyUserDetails");

  useEffect(() => {
    if (pathname === "/user-settings") {
      setAreDetails(true);
    } else if (!areUserDetails && areDetails) setAreDetails(false);
  }, [pathname, tabParam]);

  const handlePrintModal = () => {
    setAreDetails((prev) => !prev);
  };

  return (
    <div>
      <ModalWrapper onClose={handlePrintModal} isOpen={!areDetails}>
        <div>
          <Link href={"/user-settings"}>
            Zapisz dane kontaktowe w ustawieniach
          </Link>
        </div>
      </ModalWrapper>
    </div>
  );
};

export default IsUserModal;
