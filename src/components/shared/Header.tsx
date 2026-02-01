
const Header = ({
  children,
}: {
  children: React.ReactNode;
}) => {

  return (
    <header className="shrink-0 bg-accent relative py-6">
      <div className="container">
        {children}
      </div>

      <div
        className="absolute inset-x-0 bottom-0 h-7
                  bg-gradient-to-t
                  from-accent_opacity
                   to-transparent
                  pointer-events-none"
      />
    </header>
  );
};

export default Header;