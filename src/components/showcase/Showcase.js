import { useEffect, useState } from "react";
import { GetFilmsAnkets } from "./getFilms";
import styles from "./showcase.module.css";
import FilmsItem from "./FilmsItem";

const Showcase = async () => {
  const [films, setFilms] = useState([]);

  const [isLoadingFilms, setIsLoadingFilms] = useState(true);

  useEffect(() => {
    async function getData() {
      const films = await GetFilmsAnkets();
      setFilms(films);
      setIsLoadingFilms(false);
    }
    getData();
  }, []);



  return (
    <div>
      {!isLoadingFilms &&
        films.map((film) => (
          <FilmsItem key={film.title} data={film}></FilmsItem>
        ))}
    </div>
  );
};

export default Showcase;
