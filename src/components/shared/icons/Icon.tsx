type Props = {
  icon: string;
  size?: number;
  className?: string;
};

const Icon = ({ icon, size = 30, className }: Props) => {
  const src = `/icons/${icon}.svg`;

  return (
    <div
      style={{
        mask: `url(${src}) no-repeat center / contain`,
        width: `${size}px`,
        height: `${size}px`,
      }}
      className={className}
    ></div>
  );
};

export default Icon;
