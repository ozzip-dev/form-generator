type Props = {
  children: React.ReactNode;
  className?: string;
};

const Card = ({ children, className }: Props) => {
  return (
    <div
      // className={`bg-bg-light rounded-md border border-default px-4 py-4 shadow-default sm:px-8 md:rounded-lg md:px-24 ${props.className} `}

      className={`bg-bg-light h-full rounded-sm border border-gray p-10 ${className && className}`}
    >
      {children}
    </div>
  );
};

export default Card;
