import Signup from "@/components/pages/auth/Signup";
import { isAdmin } from "@/lib/utils";
import { requireUser } from "@/services/user-service";
import { redirect } from "next/navigation";

const CreateUserPage = async () => {
  const user = await requireUser();
  if (!user) redirect("/login");
  if (!isAdmin(user)) redirect("/forms/list");

  return <Signup />;
};

export default CreateUserPage;
