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

  const pathname = usePathname();
  const noBlockedPath =
    pathname !== "/user-settings" && pathname !== "/dashboard-admin";
  const areUserDetails = hasCompleteCommitteeData(user);

  const shouldOpenModal = !areUserDetails && noBlockedPath;
  const [isModalOpen, setModalOpen] = useState(shouldOpenModal);

  const searchParams = useSearchParams();
  const tabParam = searchParams.get("emptyUserDetails");

  useEffect(() => {
    if (!areUserDetails && noBlockedPath) {
      setModalOpen(true);
    } else {
      setModalOpen(false);
    }
  }, [pathname, tabParam]);

  const handlePrintModal = () => {
    setModalOpen((prev) => !prev);
  };

  return (
    <ModalWrapper isOpen={isModalOpen} onClose={handlePrintModal}>
      <div>
        <Link href={"/user-settings"}>
          Zapisz dane kontaktowe w ustawieniach
        </Link>
      </div>
    </ModalWrapper>
  );
};

export default IsUserModal;
