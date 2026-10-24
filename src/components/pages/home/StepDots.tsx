type Props = {
  isDisplayed?: boolean;
};

const StepDots = ({ isDisplayed = true }: Props) => {
  return (
    <div className="flex flex-1 flex-col items-center justify-around">
      {isDisplayed && (
        <>
          <span className="bg-accent-dark h-2 w-2 rounded-full" />
          <span className="bg-accent-dark h-2 w-2 rounded-full" />
        </>
      )}
    </div>
  );
};

export default StepDots;
