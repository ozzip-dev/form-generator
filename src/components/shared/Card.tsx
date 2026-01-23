type Props = {
  children: React.ReactNode;
  className?: string;
};

const Card = (props: Props) => {
  return (
    <div
      className={`
          py-8 px-4 sm:px-8 md:px-24
          border border-default
          shadow-default
          rounded-md md:rounded-lg
          bg-bg_light
          ${props.className}
        `}
    >
      {props.children}
    </div>
  );
};

export default Card;
