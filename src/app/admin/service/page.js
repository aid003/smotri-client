"use client";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  const token = localStorage.getItem("colorTheme")

  const auth = useAuth(token);

  useEffect(() => {
    
  },[])

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
