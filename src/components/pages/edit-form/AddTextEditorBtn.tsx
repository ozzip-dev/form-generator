import { Button, Icon } from "@/components/shared";

type Props = {
  action: () => void;
};

const AddTextEditorBtn = (props: Props) => {
  return (
    <div className="group relative">
      <Button
        type="button"
        variant="ghost"
        className="border-font-dark !rounded-full border p-[0.2rem]"
        onClickAction={props.action}
        ariaLabel="Dodaj edytor"
      >
        {" "}
        <Icon icon="plus-solid-full" size={12} className="bg-font-dark" />
      </Button>

      <div className="bg-font-dark pointer-events-none absolute right-[0] top-10 z-50 whitespace-nowrap rounded-sm p-4 text-sm text-white opacity-0 transition-opacity group-hover:opacity-100">
        Dodaj opis pytania
      </div>
    </div>
  );
};

export default AddTextEditorBtn;
