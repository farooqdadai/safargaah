import "./globals.css";
import { Manrope, Noto_Nastaliq_Urdu, Oswald } from "next/font/google";
import ScrollReveal from "./components/ScrollReveal";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display"
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body"
});

const notoNastaliqUrdu = Noto_Nastaliq_Urdu({
  subsets: ["arabic"],
  weight: ["400", "600"],
  variable: "--font-urdu"
});

export const metadata = {
  title: "Safargaah | Pakistan Travel",
  description:
    "Safargaah curates mountains, lakes, heritage cities, and coastlines across Pakistan."
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${oswald.variable} ${manrope.variable} ${notoNastaliqUrdu.variable}`}
    >
      <body>
        <ScrollReveal />
        {children}
      </body>
    </html>
  );
}
