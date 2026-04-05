import UserSettings from "@/components/pages/user-settings/UserSettings";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Formy pracy - Edycja danych kontaktowych użytkownika",
};

const UserSettingsPage = async () => {
  return (
    <div className="container">
      <UserSettings />
    </div>
  );
};

export default UserSettingsPage;
