"use client";
import { customFetch } from "@/middleware/customFetch";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default async function Home() {
  const [data, setData] = useState();
  const router = useRouter();

  const checkIsValidToken = async () => {
    const token = localStorage.getItem("colorTheme");

    const response = await customFetch(
      "http://localhost:5005/api/login-user-with-token/",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    setData(data);
  };

  useEffect(() => {
    checkIsValidToken();
  }, []);

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
