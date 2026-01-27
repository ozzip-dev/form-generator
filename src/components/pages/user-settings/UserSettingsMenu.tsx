import { NavMenu } from "@/components/shared/nav-menu";

const UserSettingsMenu = () => {
    const dataNavLinks = [
        { text: "Dane kontaktowe", link: `/settings/user-settings` },
        { text: "Polityka prywatności ", link: `/settings/user-privacy` },
    ];
    return (
        <NavMenu links={dataNavLinks} icon="gear" depth={3} level="sub" />
    );
};

export default UserSettingsMenu;