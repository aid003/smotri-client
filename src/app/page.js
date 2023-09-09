import CategorySet from "@/components/categotyTile/CategorySet";
import styles from "./page.module.css";
import Showcase from "@/components/showcase/Showcase";
import Loading from "./loading";
import { Suspense } from "react";
import NewFilms from "@/components/newFilms/NewFilms";

export async function generateStaticParams() {
  const posts = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_PATH}get-titles/`
  ).then((res) => res.json());

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

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
              <Showcase>
                <NewFilms></NewFilms>
                <div className={styles.space}></div>
              </Showcase>
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
}
