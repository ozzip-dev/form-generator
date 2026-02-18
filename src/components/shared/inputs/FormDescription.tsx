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
      ? "p-2 text-sm border rounded-sm textEditorTags w-full overflow-hidden"
      : "textEditorTags mb-3";

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
