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
      <div className="flex items-center justify-items-center p-8 ">home</div>
      <footer className="flex justify-center items-center p-2">
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
          className="h-[25px] w-auto pl-2 border-l-2 border-zinc-400"
          placeholder="blur"
          blurDataURL="/images/placeholder.jpg"
          loading="lazy"
        />
      </footer>
    </>
  );
};
export default Home;
