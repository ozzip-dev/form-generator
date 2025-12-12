import "./iconPDF.css";

type Props = {
  style: string;
};

// TODO: className icon-pdf? w CSS bez wielkich liter
// props nazwac inaczej lub style w formie obiektu do parametru 'style'
const IconPDF = (props: Props) => {
  return <div className={`iconPDF ${props.style}`}></div>;
};

export default IconPDF;
