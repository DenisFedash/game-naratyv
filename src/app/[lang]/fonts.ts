import { Open_Sans, Press_Start_2P } from "next/font/google";

export const openSansHebrew = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--open-sans-hebrew",
});

export const pressStart2p = Press_Start_2P({
    subsets: ["latin"],
    weight: ["400"],
    display: "swap",
    variable: "--press-start-2p"
})