import Image from "next/image";

type Props = {
  headerFileData: string;
};

const CreatedFormTopImage = ({ headerFileData }: Props) => {


  return (
    <div className="w-full my-8 flex justify-center">
      <div className="relative w-full h-[20rem] overflow-hidden rounded-md md:rounded-lg">
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
