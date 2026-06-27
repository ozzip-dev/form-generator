import Home from "@/components/pages/home/Home";
import {
  Faq,
  FormTemplates,
  Hero,
  Steps,
  Tool,
  Usage,
  Vote,
} from "@/components/pages/home/sections";
import ContactDetails from "@/components/pages/home/sections/ContactDetails";

const PageHome = () => {
  return (
    <Home>
      <Hero />
      <Tool />
      <FormTemplates />
      <Steps />
      <Vote />
      <Usage />
      <Faq />
      <ContactDetails />
    </Home>
  );
};
export default PageHome;
