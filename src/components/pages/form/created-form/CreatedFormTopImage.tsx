import Image from "next/image";

type Props = {
  headerFileData: string;
};

const CreatedFormTopImage = ({ headerFileData }: Props) => {
  return (
    <div className="mb-8 flex w-full justify-center overflow-hidden rounded-md border md:rounded-lg">
      <Image
        src={`data:image/png;base64,${headerFileData}`}
        alt=""
        width={0}
        height={0}
        sizes="100vw"
        className="h-auto w-full max-w-full object-contain"
        priority
      />
    </div>
  );
};

export default CreatedFormTopImage;
