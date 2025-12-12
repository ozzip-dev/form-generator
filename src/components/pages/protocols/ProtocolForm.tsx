import { Button } from "@/components/shared";

type Props = {
  handlePrintForm: () => void;
};

const ProtocolForm = (props: Props) => {
  return (
    <div>
      <Button
        message="Anuluj"
        type="button"
        onClickAction={props.handlePrintForm}
      />
    </div>
  );
};

export default ProtocolForm;
