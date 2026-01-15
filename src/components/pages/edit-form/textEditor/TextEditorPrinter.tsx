import { Button } from "@/components/shared";
import FormDescription from "@/components/shared/inputs/FormDescription";

type Props = {
  description: string;
  printDescriptionInput: () => void;
};

const TextEditorPrinter = (props: Props) => {
  return (
    <div>
      <FormDescription description={props.description} />
      <Button
        message="Edytuj"
        variant="primary-rounded"
        onClickAction={props.printDescriptionInput}
      />
    </div>
  );
};

export default TextEditorPrinter;
