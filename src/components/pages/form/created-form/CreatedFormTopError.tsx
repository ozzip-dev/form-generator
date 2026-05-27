import { Dispatch, SetStateAction } from "react";

type Props = {
  setDisplayInvalidInfo: Dispatch<SetStateAction<boolean>>;
};

const CreatedFormTopError = (props: Props) => {
  return (
    <button
      onClick={() => props.setDisplayInvalidInfo(false)}
      className="absolute left-0 top-0 z-20 w-screen bg-accent py-8 text-center text-white transition-transform duration-700 ease-in-out"
    >
      Nieprawidłowo wypełniony formularz
    </button>
  );
};

export default CreatedFormTopError;
