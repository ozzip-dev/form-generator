import Link from "next/link";
import Image from "next/image";

const Home = () => {
  return (
    <>
      <div className="m-4 block items-center justify-items-center text-end">
        <Link href="/login" className="btn-primary-rounded text-xl">
          zaloguj
        </Link>
      </div>
      <footer className="flex items-center justify-center p-2">
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
          className="h-[25px] w-auto border-l-2 border-zinc-400 pl-2"
          placeholder="blur"
          blurDataURL="/images/placeholder.jpg"
          loading="lazy"
        />
      </footer>
    </>
  );
};
export default Home;
