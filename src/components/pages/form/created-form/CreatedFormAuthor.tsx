const CreatedFormAuthor = (props: { authorEmail: string }) => {
  return (
    <div className="m-auto w-fit text-center sm:flex">
      <div className="mr-2 text-font_light">Kontakt twórcy formularza: </div>
      <div className="font-semibold">{props.authorEmail}</div>
    </div>
  );
};

export default CreatedFormAuthor;
