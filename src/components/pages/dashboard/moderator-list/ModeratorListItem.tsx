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

  const committeeAssigned = !!(
    committeeName &&
    committeeEmail &&
    committeePhone
  );

  return (
    <Card key={email}>
      <div className="">
        <div className="flex gap-2">
          <div className="w-44 text-right font-semibold">Moderacja:</div>
          {name}
        </div>
        <div className="flex gap-2">
          <div className="w-44 text-right font-semibold"></div>
          {email} <span className="text-sm">({verifiedInfo})</span>
        </div>
      </div>
      <>
        <div className="flex gap-2">
          <div className="w-44 text-right font-semibold">Nazwa:</div>
          {committeeName || <span className="text-font_light">brak</span>}
        </div>
        <div className="flex gap-2">
          <div className="w-44 text-right font-semibold">Telefon:</div>
          {committeePhone || <span className="text-font_light">brak</span>}
        </div>
        <div className="flex gap-2">
          <div className="w-44 text-right font-semibold">Email:</div>
          {committeeEmail || <span className="text-font_light">brak</span>}
        </div>
      </>
    </Card>
  );
};

export default ModeratorListItem;
