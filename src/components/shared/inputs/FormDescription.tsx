"use client";

import DOMPurify from "dompurify";

type Props = {
  description?: string;
  variant: "edit" | "published";
};

const FormDescription = (props: Props) => {
  if (!props.description) return null;

  const styles =
    props.variant === "edit"
      ? "mb-1 p-2 text-sm border rounded-sm textEditorTags"
      : "textEditorTags";

  return (
    <div
      className={styles}
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(props.description),
      }}
    />
  );
};

export default FormDescription;
