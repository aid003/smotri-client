import { customFetch } from "@/middleware/customFetch";

export async function getData() {
  const films = await customFetch(
    `${process.env.NEXT_PUBLIC_SERVER_PATH}get-films/`
  );

  if (!films) {
    throw new Error("Data fetching false");
  }

  return films.data;
}

