import ConfirmPrivacyText from "@/components/pages/privacy/ConfirmPrivacyText";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Formy pracy - Polityka prywatności",
};

const UerPrivacyPage = () => {
  return (
    <div className="container mb-16">
      <ConfirmPrivacyText />
    </div>
  );
};

export default UerPrivacyPage;
