import { requireUser } from "@/services/user-service";

const DashboardModerator = async () => {
  const user = await requireUser();

  return (
    <div className="m-4">
      Witaj, <span className="font-black">{user.name}</span>
    </div>
  );
};

export default DashboardModerator;
