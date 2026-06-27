import Link from "next/link";

const PageNotFound = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      Błędny adres
      <div className="w-full px-4 py-2 text-center">
        <Link
          href="/"
          className="text-accent hover:underline hover:decoration-accent"
        >
          Wróc do strony głównej
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
