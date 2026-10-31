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
        className="mb-1 ml-3 !text-sm !text-accent"
      >
        {" "}
        Edytuj opis
      </Button>
      <FormDescription description={props.description} variant="edit" />
    </div>
  );
};

export default TextEditorPrinter;
