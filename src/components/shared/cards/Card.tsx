type Props = {
  children: React.ReactNode;
  className?: string;
};

const Card = ({ children, className }: Props) => {
  return (
    <div
      className={`bg-bg-light rounded-sm border border-gray p-8 ${className && className}`}
    >
      {children}
    </div>
  );
};

export default Card;
