import { Card } from "@/components/shared";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Formy pracy - Dane kontaktowe administratora",
};

const AdminContactPage = () => {
  return (
    <div className="flex h-full items-center justify-center overflow-y-auto">
      <Card className="mx-auto w-5/6 max-w-[50rem] text-center sm:w-2/3">
        <h2 className="mb-4 text-lg font-semibold">Kontakt</h2>

        <p className="mb-10 text-font_dark">
          Reprezentujesz związek zawodowy i chcesz korzystać z aplikacji
          <span className="font-semibold text-accent"> Formy Pracy</span> w
          swojej działaności? Skontaktuj się z administratorem, który utworzy
          kondo dla twoje organizacji.
        </p>

        <div className="">
          Email:{" "}
          <span className="font-semibold text-accent">wstapdoip@ozzip.pl</span>
        </div>
        <div className="mt-1">
          {" "}
          Telefon:{" "}
          <span className="font-semibold text-accent">514 252 205</span>
        </div>
      </Card>
    </div>
  );
};

export default AdminContactPage;
