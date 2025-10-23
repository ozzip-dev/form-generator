"use client";

type Props = {
  errorMsg?: string;
};

const InputError = (props: Props) => {
  return <div className="text-xs text-red-500 h-4">{props?.errorMsg}</div>;
};

export default InputError;
