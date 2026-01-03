import Signup from "@/components/pages/auth/Signup";
import { isAdmin } from "@/lib/utils";
import { requireUser } from "@/services/user-service";
import { redirect } from "next/navigation";

const CreateUserPage = async () => {
  const user = await requireUser();

  if (!isAdmin(user)) redirect("/dashboard");

  return <Signup />;
};

export default CreateUserPage;
