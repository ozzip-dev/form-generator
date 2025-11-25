"use client";

import { use, useEffect, useState } from "react";
import ModalWrapper from "./ModalWrapper";
import Link from "next/link";
import { useUser } from "@/context/UserContextProvider";
import { usePathname } from "next/navigation";

const requredCommitteeKeys = [
  "committeeEmail",
  "committeeName",
  "committeePhone",
  "committeeUnion",
];

export function hasCompleteCommitteeData(user: any): boolean {
  return requredCommitteeKeys.every((key) => {
    const value = user[key];
    return (
      value !== undefined &&
      value !== null &&
      typeof value === "string" &&
      value.trim().length > 0
    );
  });
}

const IsUserModal = () => {
  const { userPromise } = useUser();
  const user = use(userPromise);

  const areUserDetails = hasCompleteCommitteeData(user);
  const [areDetails, setAreDetails] = useState(areUserDetails);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/user-settings") {
      setAreDetails(true);
    } else if (!areUserDetails && areDetails) setAreDetails(false);
  }, [pathname]);

  console.log("www", pathname);
  console.log("areDetails", areDetails);

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
