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
import HeroAnimation from "@/components/pages/home/sections/HeroAnimation";
import Start from "@/components/pages/home/sections/Start";

const PageHome = () => {
  return (
    <Home>
      {/* <Hero /> */}
      <HeroAnimation />
      <Tool />
      <FormTemplates />
      <Steps />
      <Vote />
      <Usage />
      <Faq />
      {/* <Start /> */}
    </Home>
  );
};
export default PageHome;
