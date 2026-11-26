import { Button, Icon } from "@/components/shared";

type Props = {
  action: () => void;
};

const AddTextEditorBtn = (props: Props) => {
  return (
    <Button
      type="button"
      variant="empty-accent"
      onClickAction={props.action}
      ariaLabel="Dodaj edytor"
      className=""
    >
      {" "}
      <Icon
        icon="plus-solid-full"
        size={18}
        className="bg-accent group-hover:bg-white"
      />
      Dodaj opis
    </Button>
  );
};

export default AddTextEditorBtn;
