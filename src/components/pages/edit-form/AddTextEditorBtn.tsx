import { Button, Icon } from "@/components/shared";

type Props = {
  action: () => void
}

const AddTextEditorBtn = (props: Props) => {

  return (
    <div className="relative group">

      <Button
        type="button"
        variant="ghost"
        className="!rounded-full border border-2 p-[0.2rem] ml-2"
        icon={
          <Icon
            icon="plus-solid-full"
            size={12}

          />
        }
        onClickAction={props.action}
      />

      <div
        className="
            absolute 
            -left-[6rem] top-10
            bg-bg_dark  text-xs
            p-2 rounded-sm border
            transition-opacity
            pointer-events-none
            z-50
               whitespace-nowrap
          opacity-0 group-hover:opacity-100 
          "
      >
        Dodaj opis
      </div>

    </div>

  );
};

export default AddTextEditorBtn;