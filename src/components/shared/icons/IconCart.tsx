type Props = {
  children: React.ReactNode;
};

const IconCart = ({ children }: Props) => {
  return (
    <div className="bg-gradient-accent w-fit rounded-sm p-4 [box-shadow:0px_8px_11px_-2px_var(--color-accent)]">
      {children}
    </div>
  );
};

export default IconCart;
