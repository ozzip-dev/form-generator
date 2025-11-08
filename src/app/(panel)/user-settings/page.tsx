import UserSettings from "@/components/pages/user-settings/UserSettings";
import { requireUser } from "@/dataAccessLayer/queries";

const PageUserSettings = async () => {
  const user = await requireUser();

  console.log("", user.name);

  return <UserSettings contactDetails={{ committeeUnion: user.name }} />;

  // if ((user.name = "ggg aaa")) {
  //   <Settings contactDetails={{ committeeUnion: user.name }} />;
  // } else {
  //   <Settings contactDetails={{ committeeUnion: user.name }} />;
  // }
};

export default PageUserSettings;
