import LogoutButton from "@/components/pages/dashboard/LogoutButton";
import { NavMenu } from "@/components/shared/nav-menu";
import { publicLinks, userProfileLinks } from "@/data/menuesLinks";

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
          <NavMenu links={userProfileLinks} depth={1} variant="mobile" />
        ) : (
          <div className="lg:hidden">
            <NavMenu links={userProfileLinks} depth={1} variant="mobile" />
          </div>
        ))}

      <div className="border-t p-4">
        <LogoutButton
          isUser={!!isLoged}
          className="mx-auto w-fit !rounded-sm !border-accent !bg-accent px-10 !text-white hover:!border-accent hover:!bg-white hover:!text-accent"
        />
      </div>
    </div>
  );
};

export default UserMenuContent;
