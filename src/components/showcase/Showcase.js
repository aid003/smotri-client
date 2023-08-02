import styles from "./showcase.module.css";
import FilmsItem from "./FilmsItem";
import { customFetch } from "@/middleware/customFetch";

const Showcase = async () => {
  const films = await getData();

  return (
    <div>
      {films.map((film) => (
        <FilmsItem key={film.id} data={film}></FilmsItem>
      ))}
    </div>
  );
};

export default Showcase;

async function getData() {
  const films = await customFetch(
    `${process.env.NEXT_PUBLIC_SERVER_PATH}get-films/`
  );

  if (!films) {
    throw new Error("Data fetching false");
  }

  return films.data;
}
