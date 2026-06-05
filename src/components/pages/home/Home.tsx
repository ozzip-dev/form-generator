import { useState } from "react";
import Faq from "./sections/Faq";
import { FormTemplates, Hero, Tool, Vote, Steps, Usage } from "./sections";
import { ButtonLink } from "@/components/shared";

const Home = () => {
  return (
    <>
      <Hero />
      <Tool />
      <FormTemplates />
      <Steps />
      <Vote />
      <Usage />
      <Faq />
    </>
  );
};
export default Home;
