import CategorySet from "@/components/categotyTile/CategorySet";
import styles from "./page.module.css";
import Showcase from "@/components/showcase/Showcase";
import Loading from "./loading";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
      <div className={styles.pageContainer}>
        <h1 className={styles.heading}>Главная страница</h1>
        <div className={styles.contentWrapper}>
          <div className={styles.categoryContainer}>
            <CategorySet></CategorySet>
          </div>
          <div className={styles.contentContainer}>
            <Suspense fallback={<Loading />}>
              <Showcase></Showcase>
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
}
