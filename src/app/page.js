"use client";
import CategorySet from "@/components/categotyTile/CategorySet";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import Showcase from "@/components/showcase/Showcase";

export default function Home() {
  const router = useRouter();

  return (
    <>
      <div className={styles.pageContainer}>
        <h1 className={styles.heading}>Главная страница</h1>
        <div className={styles.contentWrapper}>
          <div className={styles.categoryContainer}>
            <CategorySet></CategorySet>
          </div>
          <div className={styles.contentContainer}>
            <Showcase></Showcase>
          </div>
        </div>
      </div>
    </>
  );
}
