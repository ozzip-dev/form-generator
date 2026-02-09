import { Button, Card } from "@/components/shared";
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
    <div className="fixed inset-0 z-[9999] flex h-full flex-col bg-white">
      <div className="shrink-0">
        <Header>
          <div className="text-transparent">e</div>
        </Header>
      </div>

      <div className="flex flex-1 flex-col items-center gap-4">
        <Card className="mt-48 !px-12 !py-16 sm:!px-36">
          <div className="mb-10 text-center text-lg font-bold">
            Formularz został przesłany
          </div>
          <Button
            message="Wróć do formularza"
            onClickAction={closeSucces}
            className="m-auto"
          />
        </Card>
      </div>
    </div>
  );
};

export default SuccesMsg;
