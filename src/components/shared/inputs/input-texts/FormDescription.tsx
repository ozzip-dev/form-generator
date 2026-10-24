type Props = {
  description?: string;
  variant: "edit" | "published";
};

import DOMPurify from "isomorphic-dompurify";

const FormDescription = ({ description, variant }: Props) => {
  if (!description) return null;

  const styles =
    variant === "edit"
      ? "p-2 text-sm border border-gray bg-white rounded-sm textEditorTags w-full overflow-hidden"
      : "textEditorTags";

  return (
    <div
      className={styles}
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(description, { ADD_ATTR: ["target"] }),
      }}
    />
  );
};

export default FormDescription;
