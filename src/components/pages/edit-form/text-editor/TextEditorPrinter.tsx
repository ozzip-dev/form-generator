import { Button, FormDescription } from "@/components/shared";

type Props = {
  description: string;
  printDescriptionInput: () => void;
};

const TextEditorPrinter = (props: Props) => {
  return (
    <div className="mb-[1.8rem]">
      <Button
        type="button"
        message="Edytuj opis"
        variant="ghost"
        onClickAction={props.printDescriptionInput}
        className="ml-auto !text-sm !text-accent"
      />
      <FormDescription description={props.description} variant="edit" />
    </div>
  );
};

export default TextEditorPrinter;
