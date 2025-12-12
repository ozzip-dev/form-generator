import { Button, InputFields } from "@/components/shared";
import { Protocol } from "@/types/protocol";

type Props = {
  handlePrintForm: () => void;
  protocol: Partial<Protocol>;
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
