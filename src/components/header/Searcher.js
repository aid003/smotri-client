"use client";
import { GetAnkets } from "@/hooks/useListFilmsAnket";
import { ValidateSearch } from "@/middleware/validateSearch";
import { useEffect, useRef, useState } from "react";
import { BsFilm } from "react-icons/bs";
import { PiStepsFill } from "react-icons/pi";
import styles from "./Header.module.css";
import { useRouter } from "next/navigation";

const Searcher = () => {
  const [searchResult, setSearchResult] = useState([]);
  const [filmsAnket, setFilmsAnket] = useState([]);
  const [isOpenWindow, setIsOpenWindow] = useState(false);

  const [isLoadingAnkets, setIsLoadingAnkets] = useState(true);

  const router = useRouter(null);

  const inputRef = useRef(null);

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

    if (target.value < 2) {
      setSearchResult([]);
    }

    console.log(searchResult);
  };

  const openWindowHandler = () => {
    setIsOpenWindow(true);
  };

  const choseItemHandler = (title) => {
    router.push(`/film/${title}`);
  };

  return (
    <div className={styles.searchInput}>
      <input
        className={isOpenWindow ? styles.inputWithModal : styles.input}
        placeholder="Input your film"
        ref={inputRef}
        onChange={inputHandler}
        onClick={openWindowHandler}
      ></input>
      {isOpenWindow &&
        (searchResult.length !== 0 ? (
          <div className={styles.searcherWindow}>
            {searchResult.map((el) => (
              <div
                className={styles.filmItem}
                key={el.title}
                onClick={() => {
                  choseItemHandler(el.title);
                }}
              >
                <div className={styles.filmItemGroup}>
                  <BsFilm className={styles.iconFilm}></BsFilm>
                  <p className={styles.filmTitle}>{el.title}</p>
                  <p>{el.yearCreate}</p>
                </div>
                <div className={styles.filmItemGroupRating}>
                  <PiStepsFill className={styles.iconSteps}></PiStepsFill>
                  <p className={styles.filmRating}>{el.ratingFilm}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.searcherWindow}>
            <p className={styles.nothingSearch}>
              По вашему запросу ничего не найдено...
            </p>
          </div>
        ))}
      {isOpenWindow && (
        <div
          className={styles.useOnClickOutside}
          onClick={() => {
            setIsOpenWindow(false);
            inputRef.current.value = "";
          }}
        ></div>
      )}
    </div>
  );
};

export default Searcher;
