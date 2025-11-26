import { Button } from "@/components/shared";
import { Dispatch, SetStateAction } from "react";

type Props = {
  setSucces: Dispatch<SetStateAction<boolean>>;
};

const SuccesMsg = (props: Props) => {
  const closeSucces = () => {
    props.setSucces((prev) => !prev);
  };

  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center gap-4 z-[9999]">
      <div>Formularz został przesłany</div>
      <div className="w-fit">
        <Button message="Wróć do formularza" onClickAction={closeSucces} />
      </div>
    </div>
  );
};

export default SuccesMsg;
