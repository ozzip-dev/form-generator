const Header = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <header className={`relative shrink-0 bg-accent py-7 ${className}`}>
      <div className="container">{children}</div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-7 bg-gradient-to-t from-accent_opacity to-transparent" />
    </header>
  );
};

export default Header;
