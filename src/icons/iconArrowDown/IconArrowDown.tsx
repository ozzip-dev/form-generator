import "./iconArrowDown.css";

type Props = {
  className: string;
};

const IconArrowDown = (props: Props) => {
  return (
    <div className={`cursor-pointer iconArrowDown ${props.className}`}></div>
  );
};

export default IconArrowDown;
