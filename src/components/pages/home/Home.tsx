import { useState } from "react";
import Faq from "./sections/Faq";
import { FormTemplates, Hero, Tool, Vote, Steps, Usage } from "./sections";

const Home = () => {
  return (
    <>
      <Hero />
      <Tool />
      <FormTemplates />
      <Vote />
      <Steps />
      <Usage />
      <Faq />
    </>
  );
};
export default Home;
