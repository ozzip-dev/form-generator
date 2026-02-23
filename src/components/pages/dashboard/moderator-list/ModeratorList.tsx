import { IUser } from "@/types/user";
import ModeratorListItem from "./ModeratorListItem";
import SectionHeader from "@/components/shared/SectionHeader";

type Props = {
  moderators: IUser[];
};

const ModeratorList = async ({ moderators }: Props) => {
  return (
    <div className="container">
      <SectionHeader message="Moderatorzy/Moderatorki" className="my-6" />

      <div className="flex flex-col gap-sm">
        {moderators.map((user) => (
          <ModeratorListItem key={user.email} {...user} />
        ))}
      </div>
    </div>
  );
};

export default ModeratorList;
