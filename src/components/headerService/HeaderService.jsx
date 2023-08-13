"use client";
import styles from "./HeaderService.module.css";
import { useRouter } from "next/navigation";

const HeaderService = ({ children }) => {
  const router = useRouter();
  return (
    <ul className={styles.container}>
      <li
        className={styles.listItem}
        onClick={() => {
          router.push("/admin/login/");
        }}
      >
        Login
      </li>
      <li
        className={styles.listItem}
        onClick={() => {
          router.push("/admin/service/");
        }}
      >
        Service menu
      </li>
      <li
        className={`${styles.listItem} ${styles.main}`}
        onClick={() => {
          router.push("/");
        }}
      >
        Main Page
      </li>
    </ul>
  );
};

export default HeaderService;
