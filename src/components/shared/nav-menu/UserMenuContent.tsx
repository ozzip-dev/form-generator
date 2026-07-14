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
      {isPublic ? <div className="lg:hidden">{publicMenu}</div> : publicMenu}

      {isLoggedIn &&
        (isPublic ? (
          <>
            <div className="border-t border-accent lg:hidden"></div>
            {userMenu}
          </>
        ) : (
          <div className="border-t border-accent lg:hidden">{userMenu}</div>
        ))}

      <div className="mt-11">
        <LogoutButton isUser={isLoggedIn} />
      </div>
    </div>
  );
};

export default UserMenuContent;
