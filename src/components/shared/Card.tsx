type Props = {
  children: React.ReactNode;
  className?: string;
};

const Card = (props: Props) => {
  return (
    <div
      className={`
          py-16 px-32
          border border-default
          shadow-default
          rounded-md
          bg-bg_light
          ${props.className}
        `}
    >
      {props.children}
    </div>
  );
};

export default Card;
