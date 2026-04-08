import Signup from "@/components/pages/auth/Signup";
import { isAdmin } from "@/lib/utils";
import { requireUser } from "@/services/user-service";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Formy pracy - Rejestracja użytkownika",
};

const CreateUserPage = async () => {
  const user = await requireUser();
  if (!user) redirect("/login");
  if (!isAdmin(user)) redirect("/forms/list");

  return <Signup />;
};

export default CreateUserPage;
