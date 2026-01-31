import { ButtonLink } from "@/components/shared";
import Header from "@/components/shared/Header";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-full flex flex-col">
      <Header>
        <div className="container">

          <ButtonLink message="Strona główna" link="/"
            variant="primary-rounded"
            className="!bg-white !text-accent w-fit
            hover:!bg-accent hover:!text-white hover:!border-white" />

        </div>
      </Header>

      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
