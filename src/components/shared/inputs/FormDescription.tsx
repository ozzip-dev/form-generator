type Props = {
  description?: string;
};

const FormDescription = (props: Props) => {
  if (!props.description) return null;
  return (
    <div
      className="mb-1 text-sm text-font_light
        [&_p]:mt-2
        [&_a]:text-accent_dark
        [&_a]:underline
        [&_h3]:text-lg
      "
      dangerouslySetInnerHTML={{ __html: props.description }}
    />
  );
};

export default FormDescription;
