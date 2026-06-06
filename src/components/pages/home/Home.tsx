import { useState } from "react";
import { FormTemplates, Hero, Tool, Vote, Steps, Usage, Faq } from "./sections";
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
