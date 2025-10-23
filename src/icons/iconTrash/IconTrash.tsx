import "./iconTrash.css";

type Props = {
  style: string;
};

const IconTrash = (props: Props) => {
  return <div className={`cursor-pointer iconTrash ${props.style}`}></div>;
};

export default IconTrash;
