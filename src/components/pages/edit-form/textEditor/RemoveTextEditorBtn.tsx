import { Button, IconTrash } from "@/components/shared";
type Props = {
    handleRemoveDescription: () => void
}


const RemoveTextEditorBtn = (props: Props) => {

    return (
        <Button
            type="button"
            icon={<IconTrash />}
            onClickAction={props.handleRemoveDescription}
            variant="ghost"
            className="w-fit h-fir !bg-red !text-error mb-auto mt-10"
        />
    );
};

export default RemoveTextEditorBtn;