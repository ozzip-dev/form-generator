type Props = {
  isDisplayed?: boolean;
};

const StepDots = ({ isDisplayed = true }: Props) => {
  return (
    <div className="flex flex-1 flex-col items-center justify-around">
      {isDisplayed && (
        <>
          <span className="h-2 w-2 rounded-full bg-[#D10000]" />
          <span className="h-2 w-2 rounded-full bg-[#D10000]" />
          <span className="h-2 w-2 rounded-full bg-[#D10000]" />
        </>
      )}
    </div>
  );
};

export default StepDots;
