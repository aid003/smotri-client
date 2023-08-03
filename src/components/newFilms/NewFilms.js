import { customFetch } from "@/middleware/customFetch";
import styles from "./newFilms.module.css";
import FilmsItem from "../filmItem/FilmItem";

const NewFilms = async () => {
  const films = await getData();

  return (
    <div>
      <h3 className={styles.heading}>New films</h3>
      <div className={styles.filmsContainer}>
        {films.map((film) => (
          <FilmsItem key={film.id} data={film}></FilmsItem>
        ))}
      </div>
    </div>
  );
};

async function getData() {
  const films = await customFetch(
    `${process.env.NEXT_PUBLIC_SERVER_PATH}get-films/`
  );

  if (!films) {
    throw new Error("Data fetching false");
  }

  return films.data;
}

export default NewFilms;
