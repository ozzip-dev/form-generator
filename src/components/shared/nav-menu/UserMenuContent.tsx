import LogoutButton from "@/components/pages/dashboard/LogoutButton";
import { NavMenu } from "@/components/shared";
import { publicLinks, userProfileLinks } from "@/lib/menuLinks";

type Props = {
  isPublic?: boolean;
  isLoggedIn: boolean;
  onClose: () => void;
};

const UserMenuContent = ({ isPublic, isLoggedIn, onClose }: Props) => {
  const publicMenu = <NavMenu links={publicLinks} depth={1} variant="mobile" />;
  const userMenu = (
    <NavMenu links={userProfileLinks} depth={1} variant="mobile" />
  );

  return (
    <div className="overflow-y-auto px-4" onClick={onClose}>
      <div className="border-b border-gray lg:hidden">{publicMenu}</div>

      {isLoggedIn && <div>{userMenu}</div>}
      <div className="mt-11">
        <LogoutButton isUser={isLoggedIn} />
      </div>
    </div>
  );
};

export default UserMenuContent;
