import { Button } from "@/components/shared";

type Props = {
  isAddBtnLoading: boolean;
  isClearBtnDisabled: boolean;
  addBtnAction: () => void;
  clearBtnAction: () => void;
};

const AcceptedValuesControls = (props: Props) => {
  return (
    <div className="flex flex-wrap justify-between gap-3">
      <Button
        type="button"
        variant="ghost"
        className="w-fit px-4 py-2 !text-accent"
        isLoading={props.isAddBtnLoading}
        onClickAction={props.addBtnAction}
      >
        Dodaj{" "}
      </Button>

      <Button
        type="button"
        variant="ghost"
        className="w-fit px-4 py-2 !text-accent"
        disabled={props.isClearBtnDisabled}
        onClickAction={props.clearBtnAction}
      >
        {" "}
        Wyczyść
      </Button>
    </div>
  );
};

export default AcceptedValuesControls;
