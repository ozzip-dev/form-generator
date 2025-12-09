import "./iconPDF.css";
type Props = {
  style: string;
};

const IconPDF = (props: Props) => {
  return <div className={`iconPDF ${props.style}`}></div>;
};

export default IconPDF;
