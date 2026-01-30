import ConfirmPrivacyBtn from "@/components/pages/privacy/ConfirmPrivacyBtn";
import ConfirmPrivacyText from "@/components/pages/privacy/ConfirmPrivacyText";

const PrivacyPolicyPage = async () => {
  return (
    <div className="container mb-16">
      <ConfirmPrivacyText />
      <ConfirmPrivacyBtn />
    </div>
  );
};

export default PrivacyPolicyPage;
