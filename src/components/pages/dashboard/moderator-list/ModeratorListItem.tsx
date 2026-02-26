import { Card } from "@/components/shared";
import { IUser } from "@/types/user";

const ModeratorListItem = async (moderator: IUser) => {
  const {
    email,
    name,
    committeeName,
    committeeEmail,
    committeePhone,
    emailVerified,
  } = moderator;

  const verifiedInfo = emailVerified ? "potwierdzony" : "niepotwierdzony";

  // TODO: refactor

  return (
    <Card key={email}>
      <div className="">
        <div className="flex gap-2">
          <div className="w-52 text-right font-semibold">Moderator/-ka:</div>
          {name}
        </div>
        <div className="flex gap-2">
          <div className="w-52 text-right font-semibold">Email:</div>
          {email}
        </div>
        <div className="flex gap-2">
          <div className="w-52 text-right font-semibold">Status:</div>
          {verifiedInfo}
        </div>
      </div>
      <>
        <div className="mt-6 flex gap-2">
          <div className="w-52 text-right font-semibold">Dane komisji:</div>
        </div>
        <div className="flex gap-2">
          <div className="w-52 text-right font-semibold">Nazwa:</div>
          {committeeName || <span className="text-font_light">brak</span>}
        </div>
        <div className="flex gap-2">
          <div className="w-52 text-right font-semibold">Telefon:</div>
          {committeePhone || <span className="text-font_light">brak</span>}
        </div>
        <div className="flex gap-2">
          <div className="w-52 text-right font-semibold">Email:</div>
          {committeeEmail || <span className="text-font_light">brak</span>}
        </div>
      </>
    </Card>
  );
};

export default ModeratorListItem;
