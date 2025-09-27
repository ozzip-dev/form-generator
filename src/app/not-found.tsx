import Link from "next/link";

const PageNotFound = () => {
  return (
    <div className="h-screen flex justify-center items-center flex-col">
      Błędny adres
      <div className="w-full text-center px-4 py-2">
        <Link
          href="/"
          className="text-blue-600 hover:underline hover:decoration-blue-600"
        >
          Wróc do strony głównej
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
