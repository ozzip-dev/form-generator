import Card from "@/components/shared/Card";
import { getSerializedFormList } from "@/services/form-service";
import { getAllSubmissions } from "@/services/result-service";
import ActiveForm from "./ActiveForm";

const getSubmissionCount = async (formId: string): Promise<number> => {
  try {
    const submissions = await getAllSubmissions(formId as string);
    return submissions?.length || 0;
  } catch (_) {
    return 0;
  }
};

const ActiveForms = async () => {
  const forms = await getSerializedFormList();
  const formWithSubmissionCount: {
    id: string;
    title: string;
    count: number;
    publishedAt: string;
  }[] = await Promise.all(
    forms.map(async ({ _id, title, publishedAt }) => ({
      id: _id as string,
      title: title || "[ tytuł ]",
      count: await getSubmissionCount(_id as string),
      publishedAt: publishedAt as string,
    })),
  );

  return (
    <Card className="mt-8">
      <div className="pb-8 text-lg font-black">Aktywne formularze</div>

      <div className="flex flex-col justify-items-start gap-8">
        {formWithSubmissionCount
          .sort(
            (a, b) =>
              new Date(b.publishedAt).getDate() -
              new Date(a.publishedAt).getDate(),
          )
          .map(({ id, title, count, publishedAt }) => (
            <ActiveForm key={id} {...{ id, title, count, publishedAt }} />
          ))}
      </div>
    </Card>
  );
};

export default ActiveForms;
