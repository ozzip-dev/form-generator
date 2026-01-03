type Props = {
  size?: "sm" | "lg";
};

export default function Loader(props: Props) {
  const size = props.size ?? "sm";

  const sizeClasses = size === "lg" ? "h-10 w-10 border-4" : "h-6 w-6 border-2";

  return (
    <div
      className={`
        ${sizeClasses}
        animate-spin rounded-full
        border-t-transparent border-solid border-current border-zinc-500
      `}
      role="status"
    ></div>
  );
}
