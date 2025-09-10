import Link from "next/link";

const Home = () => {
  return (
    <>
      <Link
        href="/login"
        className="text-end block items-center justify-items-center m-2"
      >
        zaloguj
      </Link>
      <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        home
      </div>
    </>
  );
};
export default Home;
