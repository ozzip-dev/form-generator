"use client";
import { ModelToast, useOneTimeToast } from "@/hooks/useOneTimeToast";

const ToastsData: ModelToast[] = [
  {
    param: "logout",
    expectedValue: "success",
    title: "Wylogowano",
    description: "Zostałeś wylogowany",
    variant: "info",
  },
];

type Props = {
  children: React.ReactNode;
};

const Home = ({ children }: Props) => {
  useOneTimeToast(ToastsData);

  return <>{children}</>;
};
export default Home;
