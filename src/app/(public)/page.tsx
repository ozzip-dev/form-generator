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
      <Usage />
      <FormTemplates />
      <Steps />
      <Vote />
      <Faq />
      {/* <Start /> */}
    </Home>
  );
};
export default PageHome;
