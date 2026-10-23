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
      className="!absolute -right-10 top-9"
    >
      <Icon icon="trash" size={20} className="bg-font-dark" />
    </Button>
  );
};

export default RemoveTextEditorBtn;
