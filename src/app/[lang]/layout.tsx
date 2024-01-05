import type { Metadata } from "next";
import { getDictionary } from "./dictionaries";
import "../../../globals.css";
import { openSansHebrew } from "./fonts";

export const metadata: Metadata = {
  title: "Naratyv-Creatyv",
  description: "Team-game Naratyv-Creatyv",
};

export default async function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const dict = await getDictionary(lang);
  return (
    <html lang={lang}>
      <head />
      <body className={openSansHebrew.className}>{children}</body>
    </html>
  );
}
