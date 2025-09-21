import Dashboard from "@/components/pages/Dashboard";
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

  return <Dashboard user={user as IUser} />;
};

export default PageDashboard;
