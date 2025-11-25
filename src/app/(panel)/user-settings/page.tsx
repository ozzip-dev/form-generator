import UserSettings from "@/components/pages/user-settings/UserSettings";
import { requireUser } from "@/services/queries/requireUser";

const UserSettingsPage = async () => {
  return <UserSettings />;
};

export default UserSettingsPage;
