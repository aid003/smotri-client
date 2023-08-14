import { useRouter } from "next/router";
import { useEffect } from "react";

export const useAccessValidator = async (router) => {
  useEffect(() => {
    async function validator() {
      const token = localStorage.getItem("colorTheme");
      if (!token) {
        router.push("/admin/login");
        return;
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
        return;
      }

      if (role === "User") {
        router.push("/admin/login");
      }
    }
    validator();
  }, [router]);
};
