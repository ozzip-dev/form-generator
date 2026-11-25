import { Button, Icon } from "@/components/shared";

type Props = {
  action: () => void;
};

const AddTextEditorBtn = (props: Props) => {
  return (
    <div className="group relative">
      <Button
        type="button"
        variant="ghost"
        className="!px-3 py-2 !text-accent hover:bg-accent-light"
        onClickAction={props.action}
        ariaLabel="Dodaj edytor"
      >
        {" "}
        <Icon icon="plus-solid-full" size={18} className="bg-accent" />
        Dodaj opis
      </Button>
    </div>
  );
};

export default AddTextEditorBtn;
