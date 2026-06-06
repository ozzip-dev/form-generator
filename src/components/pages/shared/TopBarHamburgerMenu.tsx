import { Button, Card, Icon } from "@/components/shared";
import { NavMenu } from "@/components/shared/nav-menu";
import { NavMenuLink } from "@/types/shared";

type Props = {
  isPublic: boolean;
  links: NavMenuLink[];
  isMenuOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
};

export default function TopBarHamburgerMenu({
  isPublic,
  links,
  isMenuOpen,
  onToggle,
  onClose,
}: Props) {
  const topLeftIcon = isMenuOpen ? "xmark" : "hamburger";
  const slideClass = isMenuOpen ? "translate-x-0" : "-translate-x-[150%]";

  return (
    <>
      <Button
        type="button"
        className={
          isPublic ? "text-font_dark lg:hidden" : "text-white lg:hidden"
        }
        icon={
          <Icon
            icon={topLeftIcon}
            size={20}
            className={isPublic ? "bg-font_dark" : "bg-white"}
          />
        }
        onClickAction={onToggle}
        variant="ghost"
        ariaLabel={isMenuOpen ? "Zamknij menu" : "Otwórz menu"}
      />

      <Card
        className={`fixed left-4 top-[6.9rem] z-40 transform rounded-sm bg-white transition-transform duration-300 ease-in-out md:left-24 lg:hidden ${slideClass}`}
      >
        <div className="px-16 md:px-0" onClick={isPublic ? undefined : onClose}>
          <NavMenu links={links} depth={1} variant="mobile" />
        </div>
      </Card>
    </>
  );
}
