"use client";

type Props = {
  id: string;
  removeInput: (id: string) => Promise<void>;
};

function RemoveInputBtn(props: Props) {
  return (
    <button
      type="button"
      className="btn btn-danger"
      onClick={() => props.removeInput(props.id)}
    >
      X
    </button>
  );
}

export default RemoveInputBtn;
