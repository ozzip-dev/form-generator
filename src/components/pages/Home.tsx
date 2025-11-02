import Link from "next/link";
import Image from "next/image";

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
      <footer className="flex justify-center items-center gap-2 p-4">
        <Image
          src="/images/UELogos.webp"
          alt="Loga"
          width={400}
          height={200}
          placeholder="blur"
          blurDataURL="/images/placeholder.jpg"
          loading="lazy"
        />
        <Image
          src="/images/TransferHubLogo.webp"
          alt="TransferHub logo"
          width={100}
          height={25}
          className="h-[25px] w-auto"
          placeholder="blur"
          blurDataURL="/images/placeholder.jpg"
          loading="lazy"
        />
      </footer>
    </>
  );
};
export default Home;
