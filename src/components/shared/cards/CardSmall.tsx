type Props = {
  children: React.ReactNode;
  className?: string;
};

const CardSmall = ({ children, className }: Props) => {
  return (
    <div
      className={`bg-bg-light h-full rounded-sm border border-gray p-10 ${className && className}`}
    >
      {children}
    </div>
  );
};

export default CardSmall;
