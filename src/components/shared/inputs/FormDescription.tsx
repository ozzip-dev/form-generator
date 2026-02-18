type Props = {
  description?: string;
  variant: "edit" | "published";
};

import DOMPurify from "isomorphic-dompurify";

const FormDescription = ({ description, variant }: Props) => {
  if (!description) return null;

  const styles =
    variant === "edit"
      ? "p-2 text-sm border rounded-sm textEditorTags w-full overflow-hidden"
      : "textEditorTags mb-3";

  return (
    <div
      className={styles}
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(description) }}
    />
  );
};

export default FormDescription;
