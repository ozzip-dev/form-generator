import DOMPurify from "dompurify";

type Props = {
  description?: string;
  variant: "edit" | "published"
};

const FormDescription = (props: Props) => {
  if (!props.description) return null;

  console.log('', props.description)

  const styles = props.variant === "edit" ? "mb-1 p-2 text-sm border rounded-sm [&_a]:text-accent_dark [&_a]:underline[&_h3]:text-lg" :
    "[&_a]:text-accent_dark [&_a]:underline [&_h3]:text-lg my-2"

  return (
    <div
      className={styles}
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(props.description) }}
    />
  );
};

export default FormDescription;
