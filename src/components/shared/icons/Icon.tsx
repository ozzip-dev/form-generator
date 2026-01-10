type Props = {
  icon: string;
  size?: number;
  color?: string;
  className?: string;
};

const Icon = ({
  icon,
  size = 30,
  color = "var(--color-font_light)",
  className,
}: Props) => {
  const src = `/icons/${icon}.svg`;

  return (
    <div
      style={{
        mask: `url(${src}) no-repeat center / contain`,
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: color,
      }}
      className={className}
    ></div>
  );
};

export default Icon;
