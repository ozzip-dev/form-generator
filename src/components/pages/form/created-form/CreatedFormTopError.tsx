type Props = {
  displayInvalidInfo: boolean;
};

const CreatedFormTopError = (props: Props) => {
  return (
    <div
      className={`absolute left-0 top-0 z-20 w-screen bg-error py-4 text-center text-white transition-transform duration-500 ease-in-out ${
        props.displayInvalidInfo ? "translate-y-0" : "-translate-y-full"
      } `}
    >
      Nieprawidłowo wypełniony formularz
    </div>
  );
};

export default CreatedFormTopError;
