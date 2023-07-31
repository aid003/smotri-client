"use client";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <>
      <div className={styles.pageContainer}>
        <h1>dsfefef</h1>
      </div>
    </>
  );
}
