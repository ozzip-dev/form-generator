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
        variant="ghost"
        onClickAction={props.printDescriptionInput}
        className="ml-auto !text-sm !text-accent"
      >
        {" "}
        Edytuj opis
      </Button>
      <FormDescription description={props.description} variant="edit" />
    </div>
  );
};

export default TextEditorPrinter;
