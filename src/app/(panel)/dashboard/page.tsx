"use client";

import DashboardAdmin from "@/components/pages/DashboardAdmin";
import DashboardModerator from "@/components/pages/DashboardModerator";
import { useUser } from "@/hooks/useUser";

const PageDashboard = () => {
  const { user } = useUser();

  if (user.role === "admin") return <DashboardAdmin />;
  if (user.role === "moderator") return <DashboardModerator />;
};

export default PageDashboard;
