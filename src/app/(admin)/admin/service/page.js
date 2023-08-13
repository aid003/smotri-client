"use client";
import HeaderService from "@/components/headerService/HeaderService";
import { useRouter } from "next/navigation";
import styles from "./service.module.css";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    async function validator() {
      const token = localStorage.getItem("colorTheme");
      if (!token) {
        router.push("/admin/login");
      }
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_PATH}login-user-with-token/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { isValidToken, role } = await response.json();

      if (!isValidToken) {
        router.push("/admin/login");
      }

      if (role === "User") {
        router.push("/admin/login");
      }
    }
    validator();
  }, [router]);

  return (
    <>
      <HeaderService />
      <ul className={styles.container}>
        <li
          className={styles.listItem}
          onClick={() => {
            router.push("/admin/upload/loader-entry/");
          }}
        >
          Загрузка сущности фильма
        </li>
        <li
          className={styles.listItem}
          onClick={() => {
            router.push("/admin/upload/loader-film/");
          }}
        >
          Загрузка видеоматериала фильма
        </li>
        <li
          className={styles.listItem}
          onClick={() => {
            router.push("/admin/upload/loader-avatar");
          }}
        >
          Загрузка постера фильма
        </li>
        <li
          className={styles.listItem}
          onClick={() => {
            router.push("/admin/update");
          }}
        >
          Изменить данные фильма
        </li>
      </ul>
    </>
  );
}
