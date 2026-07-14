"use client";

import { Card } from "@/components/shared";
import FormAuthFooter from "./FormAuthFooter";

type Props = {
  children: React.ReactNode;
  header: string;
  footerMessage: string;
  footerLink: string;
  footerUrl: string;
};

const AuthForm = (props: Props) => {
  return (
    <div className="flex h-full flex-col items-center justify-center p-4 pt-24">
      <h1 className="text-center text-xl">{props.header}</h1>

      <Card className="my-10 w-full min-w-[29rem] max-w-[52rem] py-16 md:!p-16">
        {props.children}
      </Card>

      <FormAuthFooter
        message={props.footerMessage}
        messageLink={props.footerLink}
        link={props.footerUrl}
      />
    </div>
  );
};

export default AuthForm;
