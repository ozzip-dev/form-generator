import Icon from "./Icon";

type Props = {
  size?: number;
  style?: Record<string, string>;
};

const IconTrash = ({ size = 20, style = {} }: Props) => {
  return <Icon icon="trash-can-regular-full" {...{ size, style }} />;
};

export default IconTrash;
