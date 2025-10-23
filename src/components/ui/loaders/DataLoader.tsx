import Loader from "./Loader";

type Props = {
  message?: string;
  size?: "sm" | "lg";
  className?: string;
};

export default function DataLoader(props: Props) {
  return (
    <div className={`flex items-center justify-center ${props.className}`}>
      <div className="text-center flex items-center flex-col">
        <Loader size={props.size ? props.size : "lg"} />
        {props.message && <p className="mt-4 text-gray-600">{props.message}</p>}
      </div>
    </div>
  );
}
