import AdminPanel from "@/components/pages/AdminPanel";
import DashboardModerator from "@/components/pages/DashboardModerator";
import { auth } from "@/lib/auth";
import { IUser } from "@/types/user";
import { headers } from "next/headers";

import Link from "next/link";

const PageDashboard = async () => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Link
          href="/login"
          className="text-blue-600 hover:underline hover:decoration-blue-600"
        >
          Zaloguj się
        </Link>
      </div>
    );
  }
  const { user } = session;

  if (!user.emailVerified) {
    return (
      <div className="flex items-center justify-center flex-col min-h-screen">
        <p className="text-center">
          Musisz potwierdzić email, aby wejść do panelu moderatora.
        </p>
        <p className="text-center">
          Wejdź w link weryfikacyjny wysłany na Twój email.
        </p>
      </div>
    );
  }
  if (user.role === "moderator") {
    return <DashboardModerator user={user as IUser} />;
  }
  if (user.role === "admin") {
    return <AdminPanel user={user as IUser} />;
  }
};

export default PageDashboard;
