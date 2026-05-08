import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import { ToastProvider } from "@/context/ToastProvider";
import "./globals.css";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Formy pracy",
  description: "Generator formularzy dla związków zawodowych",
  icons: "/favicon.png",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className="h-full overflow-hidden">
      <body className={`${openSans.className} h-full overflow-hidden`}>
        <a href="#main-content" className="skip-link">
          Przejdź do głównej treści
        </a>
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
