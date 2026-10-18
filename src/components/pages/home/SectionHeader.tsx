type Props = {
  title?: string;
  header: string;
  subheader?: string;
  className?: string;
};

const SectionHeader = (props: Props) => {
  return (
    <div className={` ${props.className && props.className}`}>
      {!!props.title && (
        <div className="text-center text-accent">{props.title}</div>
      )}

      <h2 className="my-2 bg-clip-text text-center text-2xl font-extrabold leading-tight text-transparent [background-image:linear-gradient(180deg,rgb(66_66_66)_60%,var(--color-accent-dark)_100%)]">
        {props.header}
      </h2>

      {!!props.subheader && (
        <div className="text-md text-center text-lg text-font_light">
          {props.subheader}
        </div>
      )}
    </div>
  );
};

export default SectionHeader;
