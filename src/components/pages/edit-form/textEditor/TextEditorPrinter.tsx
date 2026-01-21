import { Button } from "@/components/shared";
import FormDescription from "@/components/shared/inputs/FormDescription";

type Props = {
  description: string;
  printDescriptionInput: () => void;
};

const TextEditorPrinter = (props: Props) => {
  return (
    <div className="mt-8">
       <Button
        type="button"
        message="Edytuj opis"
        variant="ghost"
        onClickAction={props.printDescriptionInput}
        className="ml-auto !text-font_dark !text-sm"
      />
      <FormDescription description={props.description} />
     
    </div>
  );
};

export default TextEditorPrinter;
