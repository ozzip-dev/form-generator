import { Button } from "@/components/shared";
import Card from "@/components/shared/Card";
import Header from "@/components/shared/Header";
import { Dispatch, SetStateAction } from "react";

type Props = {
  setSucces: Dispatch<SetStateAction<boolean>>;
};

const SuccesMsg = (props: Props) => {
  const closeSucces = () => {
    props.setSucces((prev) => !prev);
  };

  return (
    <div className="fixed inset-0 bg-white z-[9999] flex flex-col h-full">
      <div className="shrink-0">
        <Header><div className="text-transparent">e</div></Header>
      </div>

      <div className="flex flex-col flex-1 items-center justify-center gap-4">

        <Card>
          <div className="text-center font-bold mb-10">Formularz został przesłany</div>
          <div className="w-fit">
            <Button message="Wróć do formularza" onClickAction={closeSucces} />
          </div>
        </Card>
      </div>

    </div>
  );
};

export default SuccesMsg;
