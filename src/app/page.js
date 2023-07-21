"use client";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div>
      <a
        onClick={() => {
          router.push("/admin/upload/video");
        }}
      >
        Загрузка фильма
      </a>
      <a
        onClick={() => {
          router.push("/admin/upload/avatar");
        }}
      >
        Загрузка картинки
      </a>
    </div>
  );
}
