"use client";

import { IUser } from "@/types/user";
import Link from "next/link";

type Props = {
  user: IUser;
};

const Dashboard = (props: Props) => {
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-8">
        <button className="btn btn-main">
          <Link href="/create-form">Utwórz formularz</Link>
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
