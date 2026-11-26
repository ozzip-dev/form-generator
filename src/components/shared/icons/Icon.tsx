type Props = {
  icon: string;
  size?: number;
  className?: string;
  id?: string;
};

const Icon = ({ icon, size = 30, className, id }: Props) => {
  const src = `/icons/${icon}.svg`;

  return (
    <div
      style={{
        mask: `url(${src}) no-repeat center / contain`,
        width: `${size}px`,
        height: `${size}px`,
      }}
      className={className}
      id={id}
    ></div>
  );
};

export default Icon;
