import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { ToastProvider } from "@/context/ToastProvider";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});
export const metadata: Metadata = {
  title: "Form Generator",
  description: "IP Form Generator App",
  icons: "/favicon.png",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className="h-full">
      <body className={`${poppins.className} h-full`}>
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
