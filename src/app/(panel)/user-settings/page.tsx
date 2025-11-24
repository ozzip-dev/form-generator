import UserSettings from "@/components/pages/user-settings/UserSettings";
import { requireUser } from "@/services/queries/requireUser";

const UserSettingsPage = async () => {
  const user = await requireUser();

  return <UserSettings userDetails={user} />;
};

export default UserSettingsPage;
