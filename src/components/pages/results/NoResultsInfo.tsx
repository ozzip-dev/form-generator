"use client";

import { Button } from "@/components/shared";
import { useRouter } from "next/navigation";

const NoResultsInfo = () => {
  const router = useRouter();

  const refreshPage = () => {
    router.refresh();
  };

  return (
    <div className="p-8">
      <div className="pb-6 font-black">Brak wyników</div>
      <Button onClickAction={refreshPage} message="Odśwież" />
    </div>
  );
};

export default NoResultsInfo;
