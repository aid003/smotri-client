import Header from "@/components/header/Header";
import "./globals.css";
import styles from "./page.module.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Smoti Tyt",
  description: "The best custom, freedom and honest cinema hoster",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <Header>
          <div className={styles.backgroundContainer}>
            <div className={styles.wrapperContainer}>{children}</div>
          </div>
        </Header>
      </body>
    </html>
  );
}
