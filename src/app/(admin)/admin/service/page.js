"use client";
import HeaderService from "@/components/headerService/HeaderService";
import { useRouter } from "next/navigation";
import styles from "./service.module.css";
import { useAccessValidator } from "@/hooks/useAccessValidator";

export default function Home() {
  const router = useRouter();
  const access = useAccessValidator(router);

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
            router.push("/admin/upload/loader-preview");
          }}
        >
          Загрузка preview фильма
        </li>
        <li
          className={styles.listItem}
          onClick={() => {
            router.push("/admin/upload/loader-photos");
          }}
        >
          Загрузка фотографий для фильма
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
