import DashboardAdmin from "@/components/pages/dashboard/DashboardAdmin";
import DashboardModerator from "@/components/pages/dashboard/DashboardModerator";
import { isModerator } from "@/lib/utils";
import { requireUser } from "@/services/user-service";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Formy pracy - Panel użytkowanika",
};

const DashboardPage = async () => {
  const user = await requireUser();

  return isModerator(user) ? <DashboardModerator /> : <DashboardAdmin />;
};

export default DashboardPage;
