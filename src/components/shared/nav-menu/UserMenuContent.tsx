import LogoutButton from "@/components/pages/dashboard/LogoutButton";
import { NavMenu } from "@/components/shared";
import { publicLinks, userProfileLinks } from "@/lib/menuLinks";

type Props = {
  isPublic?: boolean;
  isLoged: boolean;
  onClose: () => void;
};

const UserMenuContent = ({ isPublic, isLoged, onClose }: Props) => {
  return (
    <div className="overflow-y-auto px-4" onClick={onClose}>
      {isPublic ? (
        <div className="lg:hidden">
          <NavMenu links={publicLinks} depth={1} variant="mobile" />
        </div>
      ) : (
        <NavMenu links={publicLinks} depth={1} variant="mobile" />
      )}

      {isLoged &&
        (isPublic ? (
          <>
            <div className="border-t border-accent lg:hidden"></div>
            <NavMenu links={userProfileLinks} depth={1} variant="mobile" />
          </>
        ) : (
          <div className="border-t border-accent lg:hidden">
            <NavMenu links={userProfileLinks} depth={1} variant="mobile" />
          </div>
        ))}
      <div className="mt-11">
        <LogoutButton isUser={!!isLoged} />
      </div>
    </div>
  );
};

export default UserMenuContent;
