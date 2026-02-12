const CreatedFormFooter = (props: { authorEmail: string }) => {
  return (
    <footer className="container flex justify-center pb-10 text-xs">
      <div className="text-center">
        <div>Kontakt twórcy formularza: </div>
        <div className="font-bold">{props.authorEmail}</div>
      </div>
    </footer>
  );
};

export default CreatedFormFooter;
