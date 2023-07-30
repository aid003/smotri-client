import { customFetch } from "@/middleware/customFetch";

export const GetAnkets = async () => {
  const filmsAnket = await customFetch(
    `${process.env.NEXT_PUBLIC_SERVER_PATH}get-films-ankets/`
  );

  return filmsAnket.data;
};
