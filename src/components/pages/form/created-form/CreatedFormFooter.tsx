const CreatedFormFooter = (props: { authorEmail: string }) => {
  return (
    <footer className="flex justify-center pb-10 text-xs">
      <div className="text-center sm:flex">
        <div className="mr-2 text-font_light">Kontakt twórcy formularza: </div>
        <div className="font-bold">{props.authorEmail}</div>
      </div>
    </footer>
  );
};

export default CreatedFormFooter;
