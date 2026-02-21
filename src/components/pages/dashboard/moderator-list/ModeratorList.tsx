import { Card } from "@/components/shared";
import { IUser } from "@/types/user";
import ModeratorListItem from "./ModeratorListItem";

type Props = {
  moderators: IUser[];
};

const ModeratorList = async ({ moderators }: Props) => {
  return (
    <div className="container">
      <div className="py-sm text-lg">Moderatorzy/Moderatorki</div>

      <div className="flex flex-col gap-sm">
        {moderators.map((user) => (
          <ModeratorListItem key={user.email} {...user} />
        ))}
      </div>
    </div>
  );
};

export default ModeratorList;
