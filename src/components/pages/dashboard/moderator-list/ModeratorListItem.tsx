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

  const verifiedInfo = emailVerified
    ? "email potwierdzony"
    : "email niepotwierdzony";

  const committeeAssigned = !!(
    committeeName &&
    committeeEmail &&
    committeePhone
  );

  return (
    <Card key={email}>
      <div className="grid grid-cols-[auto,1fr] items-center gap-x-md">
        <div className="col-span-2 pt-4 text-sm">użytkownik/użytkowniczka:</div>
        <div>{name}</div>
        <div>
          {email} <span className="text-sm">({verifiedInfo})</span>
        </div>
        {committeeAssigned && (
          <>
            <div className="col-span-2 pt-4 text-sm">dane komisji:</div>
            <div>{committeeName}</div>
            <div className="flex gap-sm">
              <div>{committeeEmail}</div>
              <div>tel. {committeePhone}</div>
            </div>
          </>
        )}
      </div>
    </Card>
  );
};

export default ModeratorListItem;
