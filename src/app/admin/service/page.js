"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default async function Home() {
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
      <a
        onClick={() => {
          router.push("/admin/update");
        }}
      >
        Изменить данные
      </a>
    </div>
  );
}
