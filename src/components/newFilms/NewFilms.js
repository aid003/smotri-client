import styles from "./newFilms.module.css";
import FilmsItem from "../filmItem/FilmItem";
import { getData } from "./GetData";

const NewFilms = async () => {
  const films = await getData();

  return (
    <div>
      <h3 className={styles.heading}>New films</h3>
      <div className={styles.filmsContainer}>
        {films.map((film) => (
          <FilmsItem key={film.id} data={film}></FilmsItem>
        ))}
        <button>next</button>
      </div>
    </div>
  );
};

export default NewFilms;
