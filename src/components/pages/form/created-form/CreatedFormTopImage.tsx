import Image from "next/image";

type Props = {
  headerFileData: string;
};

const CreatedFormTopImage = ({ headerFileData }: Props) => {
  return (
    <div className="mb-8 flex w-full justify-center">
      <div className="relative h-[16rem] w-full overflow-hidden rounded-md border md:rounded-lg">
        <Image
          src={`data:image/png;base64,${headerFileData}`}
          alt="Nagłówek formularza"
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
};

export default CreatedFormTopImage;
