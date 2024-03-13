import { usePathname } from "next/navigation";

export default function useLang() {
  const pathname = usePathname();
  const lang = pathname.split("/")[0];
  console.log("Current lang: " + lang);

  return lang;
}
