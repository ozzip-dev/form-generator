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
        className="ml-2 !rounded-full border-2 p-[0.2rem]"
        icon={<Icon icon="plus-solid-full" size={12} />}
        onClickAction={props.action}
        ariaLabel="Dodaj edytor"
      />

      <div className="pointer-events-none absolute -left-[6rem] top-10 z-50 whitespace-nowrap rounded-sm border bg-bg_dark p-2 text-xs opacity-0 transition-opacity group-hover:opacity-100">
        Dodaj opis
      </div>
    </div>
  );
};

export default AddTextEditorBtn;
