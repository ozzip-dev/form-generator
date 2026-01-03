import { requireUser } from "@/services/user-service";

const DashboardAdmin = async () => {
  const user = await requireUser();

  return (
    <div>
      Admin dashboard: <span className="font-black">{user.name}</span>
    </div>
  );
};

export default DashboardAdmin;
