import Card from "./Card";

type Props = {
  message: string | React.ReactNode;
  video: string;
};

const VideoCard = ({ message, video }: Props) => {
  return (
    <div className="mx-auto max-w-[55rem]">
      {" "}
      <h2 className="mb-9 px-16 text-center">{message}</h2>
      <Card className="mx-auto max-w-[55rem] !p-4">
        <video controls preload="metadata" className="mx-0 w-full rounded-md">
          <source src={video} type="video/mp4" />
          Twoja przeglądarka nie obsługuje odtwarzacza wideo.
        </video>
      </Card>
    </div>
  );
};

export default VideoCard;
