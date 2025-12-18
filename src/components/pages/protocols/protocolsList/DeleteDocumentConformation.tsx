import { Button } from "@/components/shared";
import { useQueryState } from "nuqs";
import { Dispatch, SetStateAction } from "react";

type Props = {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
};

const DeleteDocumentConformation = (props: Props) => {
  const [, setModal] = useQueryState("modal");

  const handleDelete = () => {
    props.setModalOpen((prev) => !prev);
    console.log("hhhwha");
  };

  return (
    <div>
      <div>Usunąć dokument?</div>
      <div className="flex gap-3">
        <Button
          message="Anuluj"
          onClickAction={() => {
            setModal(null);
          }}
        />
        <Button message="Usuń" onClickAction={handleDelete} />
      </div>
    </div>
  );
};

export default DeleteDocumentConformation;
