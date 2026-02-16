import { Button, IconTrash } from "@/components/shared";
type Props = {
  handleRemoveDescription: () => void;
};

const RemoveTextEditorBtn = (props: Props) => {
  return (
    <Button
      type="button"
      icon={<IconTrash />}
      onClickAction={props.handleRemoveDescription}
      variant="ghost"
      className="h-fir !bg-red mb-auto ml-4 mt-10 w-fit !text-error"
    />
  );
};

export default RemoveTextEditorBtn;
