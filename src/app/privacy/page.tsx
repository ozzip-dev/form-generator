import ConfirmPrivacyBtn from "@/components/pages/privacy/ConfirmPrivacyBtn";
import ConfirmPrivacyText from "@/components/pages/privacy/ConfirmPrivacyText";
import SectionHeader from "@/components/shared/SectionHeader";

const PrivacyPolicyPage = async () => {
  return (
    <div className="container mb-16">
      <div className="my-16">
        <SectionHeader message="Zaakceptuj, aby przejść dalej" />
      </div>

      <ConfirmPrivacyText />
      <ConfirmPrivacyBtn />
    </div>
  );
};

export default PrivacyPolicyPage;
