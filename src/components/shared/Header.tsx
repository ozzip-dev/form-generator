const Header = ({
  children,
  className,
  showBottomGradient = true,
}: {
  children: React.ReactNode;
  className?: string;
  showBottomGradient?: boolean;
}) => {
  return (
    <header className={`relative z-20 shrink-0 bg-accent py-7 ${className}`}>
      <div className="container">{children}</div>

      {showBottomGradient && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-7 shadow-[inset_0_-10px_16px_-14px_rgba(0,0,0,0.28)]" />
      )}
    </header>
  );
};

export default Header;
