import { NavMenuLink } from "@/types/shared";

export const userProfileLinks: NavMenuLink[] = [
  { text: "Formularze", link: "/forms/list" },
  { text: "Protokoły", link: "/protocols/list" },
  { text: "Forum", link: "/forum/list" },
  { text: "Ustawienia", link: "/settings/user-settings" },
];

export const adminNavLinks: NavMenuLink[] = [
  { text: "Strona główna", link: "/dashboard" },
  { text: "Dodaj użytkownika", link: "/create-user" },
];

export const publicLinks: NavMenuLink[] = [
  { text: "Instrukcja formularz", link: "/forms-doc" },
  { text: "Instrukcja archiwum", link: "/protocols-doc" },
];
