const Header = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <header
      className={`sticky top-0 z-30 shrink-0 bg-white/80 py-3 shadow-[0_1px_0_rgba(0,0,0,0.06)] backdrop-blur-md ${className}`}
    >
      <div className="container">{children}</div>
    </header>
  );
};

export default Header;
