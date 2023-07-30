"use client";
import { GetAnkets } from "@/hooks/useListFilmsAnket";
import { ValidateSearch } from "@/middleware/validateSearch";
import { useEffect, useState } from "react";
import styles from './Header.module.css'

const Searcher = () => {
  const [searchResult, setSearchResult] = useState([]);
  const [filmsAnket, setFilmsAnket] = useState([]);

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

    console.log(searchResult);
  };

  return (
    <div className={styles.searchInput}>
      <input placeholder="Input your film" onChange={inputHandler}></input>
    </div>
  );
};

export default Searcher;
