type Props = {
  children: React.ReactNode;
  className?: string;
};

const CardSmall = ({ children, className }: Props) => {
  return (
    <div
      className={`h-full rounded-sm border border-gray bg-bg_light p-10 ${className && className}`}
    >
      {children}
    </div>
  );
};

export default CardSmall;
