import Image from "next/image";

export default function PublicFooter() {
  return (
    <footer className="mt-auto bg-font_dark">
      <div className="items-center justify-center bg-white p-2 md:flex">
        <Image
          src="/images/UELogos.webp"
          alt="Loga"
          width={400}
          height={200}
          placeholder="blur"
          blurDataURL="/images/placeholder.jpg"
          loading="lazy"
          className="m-auto md:m-0"
        />
        <Image
          src="/images/TransferHubLogo.webp"
          alt="TransferHub logo"
          width={100}
          height={25}
          className="m-auto h-[25px] pl-2 md:m-0 md:border-l-2 md:border-zinc-400"
          placeholder="blur"
          blurDataURL="/images/placeholder.jpg"
          loading="lazy"
        />
      </div>
    </footer>
  );
}
