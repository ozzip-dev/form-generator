import { Button, Icon } from "@/components/shared";
type Props = {
  handleRemoveDescription: () => void;
};

const RemoveTextEditorBtn = (props: Props) => {
  return (
    <Button
      type="button"
      onClickAction={props.handleRemoveDescription}
      variant="ghost"
      ariaLabel="Usuń opis"
    >
      <Icon icon="trash" size={22} className="bg-font-dark" />
    </Button>
  );
};

export default RemoveTextEditorBtn;
