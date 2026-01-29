import { requireUser } from "@/services/user-service";
import ActiveForms from "./dashboard-moderator/ActiveForms";

const DashboardModerator = async () => {
  const user = await requireUser();

  return (
    <div className="m-8">
      Witaj, <span className="font-black">{user.name}</span>
      <ActiveForms />
    </div>
  );
};

export default DashboardModerator;
