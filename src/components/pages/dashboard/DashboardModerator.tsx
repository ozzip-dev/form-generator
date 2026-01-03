import { requireUser } from "@/services/user-service";

const DashboardModerator = async () => {
  const user = await requireUser();

  return (
    <div>
      Moderator dashboard: <span className="font-black">{user.name}</span>
    </div>
  );
};

export default DashboardModerator;
