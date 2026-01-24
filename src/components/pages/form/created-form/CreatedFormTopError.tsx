type Props = {
  isError: boolean;
};

const CreatedFormTopError = (props: Props) => {
  return (
    <div
      className={`w-screen z-20 py-8 bg-accent 
    text-white text-center absolute left-0 -top-[6.5rem]
  transition-transform duration-700 ease-in-out z-20
   ${props.isError ? "translate-y-[6.5rem]" : "translate-y-0"}
`}
    >
      Wypełnij wymagane pola formularza
    </div>
  );
};

export default CreatedFormTopError;
