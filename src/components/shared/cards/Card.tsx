type Props = {
  children: React.ReactNode;
  className?: string;
  id?: number | null;
};

const Card = ({ children, className, id }: Props) => {
  return (
    <div
      {...(id !== undefined ? { id: String(id) } : {})}
      className={`rounded-sm border border-gray bg-white p-8 ${className ?? ""}`}
    >
      {children}
    </div>
  );
};

export default Card;
