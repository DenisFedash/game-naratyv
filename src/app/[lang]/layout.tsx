import "../../../globals.scss";
import type { Metadata } from "next";
import { openSansHebrew } from "./fonts";
import { getDictionary } from "./dictionaries";
import { LikesProvider } from "@/components/utils/LikesContext/LikesContext";
import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";


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
      <body className={openSansHebrew.className}>
         <LikesProvider>
          <Header textTr={dict.header} lang={lang} />
          {children}
          <Footer textTr={dict.footer} lang={lang} />
          </LikesProvider>
        <script async defer src="https://apis.google.com/js/api.js" onLoad="gapiLoaded()"></script>
    <script async defer src="https://accounts.google.com/gsi/client" onLoad="gisLoaded()"></script>
    <script type="text/javascript" src="./assets/scripts/googleEvent.js"></script> 
      </body>
    </html>
  );
}