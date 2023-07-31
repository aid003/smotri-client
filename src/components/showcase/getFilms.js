import { customFetch } from "@/middleware/customFetch";

export const GetFilmsAnkets = async () => {
  const data = await customFetch(
    `${process.env.NEXT_PUBLIC_SERVER_PATH}get-films/`
  );

  return data;
};
