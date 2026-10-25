const CreatedFormAuthor = (props: { authorEmail: string }) => {
  return (
    <div className="m-auto w-fit text-center sm:flex">
      <div className="text-font-light mr-2">Kontakt twórcy formularza: </div>
      <div className="font-semibold">{props.authorEmail}</div>
    </div>
  );
};

export default CreatedFormAuthor;
