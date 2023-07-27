"use client";
import { customFetch } from "@/middleware/customFetch";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default async function Home() {
  const router = useRouter();
  const [colorTheme, setColorTheme] = useState();

  useEffect(() => {
    async function validator() {
      const token = localStorage.getItem("colorTheme");
      setColorTheme(token);
      if (!token) {
        router.push("/admin/login");
        return;
      }
      const response = await fetch(
        "http://localhost:5005/api/login-user-with-token/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { isValidToken, role } = await response.json();

      if (!isValidToken) {
        router.push("/admin/login");
        return;
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
    </div>
  );
}
