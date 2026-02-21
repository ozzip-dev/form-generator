import { getAllModerators } from "@/services/user-service";
import { ModeratorList } from "./moderator-list";

const DashboardAdmin = async () => {
  const moderators = await getAllModerators();

  return (
    <div className="container">
      <ModeratorList moderators={moderators} />
    </div>
  );
};

export default DashboardAdmin;
