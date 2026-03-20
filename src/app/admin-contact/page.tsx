const AdminContactPage = () => {
  return (
    <div className="h-full overflow-y-auto">
      <div className="mx-auto mt-10 max-w-xl rounded-lg border bg-bg_light p-6 text-center shadow-default">
        <h2 className="mb-4 text-lg font-semibold">Kontakt</h2>

        <p className="mb-6 text-font_light">
          Reprezentujesz związek zawodowy i chcesz korzystać z aplikacji
          <span className="font-semibold text-accent"> Formy Pracy</span> w
          swojej działaności? Skontaktuj się z administratorem.
        </p>

        <div className="">
          Email:{" "}
          <span className="font-semibold text-accent">
            formypracy@gmail.com
          </span>
        </div>
        <div className="mt-6">
          {" "}
          Telefon:{" "}
          <span className="font-semibold text-accent">514 252 205</span>
        </div>
      </div>
    </div>
  );
};

export default AdminContactPage;
