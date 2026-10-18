type Props = {
  children: React.ReactNode;
  className?: string;
};

const IconCart = ({ children, className }: Props) => {
  return (
    <div
      className={`bg-gradient-accent w-fit rounded-sm p-4 [box-shadow:0px_8px_14px_-4px_var(--color-accent)] ${className && className}`}
    >
      {children}
    </div>
  );
};

export default IconCart;
