"use client";

import { Button } from "@/components/shared";
import { useRouter } from "next/navigation";

const NoResultsInfo = () => {
  const router = useRouter();

  const refreshPage = () => {
    router.refresh();
  };

  return (
    <div>
      <div className="pb-4">Brak wyników</div>
      <Button onClickAction={refreshPage} message="Odśwież" />
    </div>
  );
};

export default NoResultsInfo;
