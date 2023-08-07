"use client";
import { GetAnkets } from "@/hooks/useListFilmsAnket";
import { ValidateSearch } from "@/middleware/validateSearch";
import { useEffect, useState } from "react";
import styles from "./Header.module.css";

const Searcher = () => {
  const [searchResult, setSearchResult] = useState([]);
  const [filmsAnket, setFilmsAnket] = useState([]);
  const [isOpenWindow, setIsOpenWindow] = useState(false);

  const [isLoadingAnkets, setIsLoadingAnkets] = useState(true);

  useEffect(() => {
    async function getAnkets() {
      setFilmsAnket(await GetAnkets());
      setIsLoadingAnkets(false);
    }
    getAnkets();
  }, []);

  const inputHandler = async ({ target }) => {
    if (filmsAnket && !isLoadingAnkets && target.value) {
      const data = await ValidateSearch(target.value, filmsAnket);
      setSearchResult(data);
    }

    if (target.value < 1) {
      setSearchResult([]);
    }

    console.log(searchResult);
  };

  const openWindowHandler = (e) => {
    setIsOpenWindow(true);
  };

  return (
    <div className={styles.searchInput}>
      <input
        placeholder="Input your film"
        onChange={inputHandler}
        onClick={openWindowHandler}
      ></input>
      {isOpenWindow &&
        (searchResult ? (
          <div>
            {searchResult.map((el) => (
              <p key={el.title}>{el.title}</p>
            ))}
          </div>
        ) : (
          <div>no</div>
        ))}
    </div>
  );
};

export default Searcher;
