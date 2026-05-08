import { Button, Icon } from "@/components/shared";
type Props = {
  handleRemoveDescription: () => void;
};

const RemoveTextEditorBtn = (props: Props) => {
  return (
    <Button
      type="button"
      icon={<Icon icon="trash" size={20} className="bg-font_dark" />}
      onClickAction={props.handleRemoveDescription}
      variant="ghost"
      ariaLabel="Usuń opis"
      className="h-fir !bg-red mb-auto ml-4 mt-10 w-fit !text-error"
    />
  );
};

export default RemoveTextEditorBtn;
