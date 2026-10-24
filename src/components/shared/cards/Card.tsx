type Props = {
  children: React.ReactNode;
  className?: string;
  id?: number | null;
};

const Card = ({ children, className, id }: Props) => {
  return (
    <div
      {...(id !== undefined ? { id: String(id) } : {})}
      className={`bg-bg-light rounded-sm border border-gray p-8 ${className ?? ""}`}
    >
      {children}
    </div>
  );
};

export default Card;
