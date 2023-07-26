"use client"
import { customFetch } from "@/middleware/customFetch";

export const useAuth = (token) => {
  if (!token) {
    return false;
  }

  const checkIsValidToken = async () => {
    const response = await customFetch(
      "http://localhost:5005/api/login-user-with-token/",
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    console.log(response);
  };
  checkIsValidToken();
};
