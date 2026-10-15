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
    </Home>
  );
};
export default PageHome;
