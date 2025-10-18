import "./#iconPlus.css";

type Props = {
  style: string;
};

const IconPlus = (props: Props) => {
  return <div className={`cursor-pointer iconPlus ${props.style}`}></div>;
};

export default IconPlus;
