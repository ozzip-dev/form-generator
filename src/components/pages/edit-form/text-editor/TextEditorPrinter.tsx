import { Button, FormDescription } from "@/components/shared";

type Props = {
  description: string;
  printDescriptionInput: () => void;
};

const TextEditorPrinter = (props: Props) => {
  return (
    <div>
      <Button
        type="button"
        variant="empty-accent"
        onClickAction={props.printDescriptionInput}
        className="mb-1"
      >
        {" "}
        Edytuj opis
      </Button>
      <FormDescription description={props.description} variant="edit" />
    </div>
  );
};

export default TextEditorPrinter;
