type Props = {
  description?: string;
};

const FormDescription = (props: Props) => {
  if (!props.description) return null;
  return (
    <div
      className="mb-1 p-2 text-sm 
        border rounded-sm
        [&_a]:text-accent_dark
        [&_a]:underline
        [&_h3]:text-lg
      "
      dangerouslySetInnerHTML={{ __html: props.description }}
    />
  );
};

export default FormDescription;
