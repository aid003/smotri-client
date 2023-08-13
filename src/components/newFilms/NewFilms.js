"use client";
import styles from "./newFilms.module.css";
import FilmsItem from "../filmItem/FilmItem";
import { getData } from "./GetData";
import { useEffect, useRef, useState } from "react";
import { BsArrowRightCircle } from "react-icons/bs";
import { BsArrowLeftCircle } from "react-icons/bs";
import debounce from "lodash.debounce";

const NewFilms = () => {
  const [films, setFilms] = useState([]);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [currentScrollLeft, setCurrentScrollLeft] = useState(0);

  const listRef = useRef(null);

  useEffect(() => {
    async function get() {
      await getData().then((req) => {
        setFilms(req);
      });
    }
    get();
  }, []);

  const checkForScrollPosition = () => {
    const { current } = listRef;
    if (current) {
      const { scrollLeft } = current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(getWidthBlock(listRef) - scrollLeft > 80);
      setCurrentScrollLeft(scrollLeft);
      console.log(getWidthBlock(listRef), scrollLeft);
    }
  };

  const getWidthBlock = (blockRef) => {
    const { width } = blockRef.current.getBoundingClientRect();
    return Math.round(width);
  };

  const scrollByContainer = (distance) => {
    listRef.current?.scrollBy({ left: distance, behavior: "smooth" });
  };

  const debounceCheckForScrollPosition = debounce(checkForScrollPosition, 100);

  useEffect(() => {
    const { current } = listRef;
    checkForScrollPosition();
    current?.addEventListener("scroll", debounceCheckForScrollPosition);

    return () => {
      current?.removeEventListener("scroll", debounceCheckForScrollPosition);
      debounceCheckForScrollPosition.cancel();
    };
  }, []);

  const back = {
    position: "absolute",
    left: `${currentScrollLeft + 3}px`,
    fontSize: "35px",
    marginBottom: "3px",
    zIndex: "5"
  };

  return (
    <div>
      <h3 className={styles.heading}>New films</h3>
      <div className={styles.filmsContainer} ref={listRef}>
        {canScrollLeft ? (
          <div
            onClick={() => {
              scrollByContainer(-getWidthBlock(listRef) + 300);
            }}
            className={styles.back}
            style={back}
          >
            <BsArrowLeftCircle></BsArrowLeftCircle>
          </div>
        ) : null}
        {films.map((film) => (
          <FilmsItem key={film.id} data={film}></FilmsItem>
        ))}
        {canScrollRight ? (
          <div
            onClick={() => {
              scrollByContainer(getWidthBlock(listRef) - 300);
            }}
            className={styles.next}
          >
            <BsArrowRightCircle></BsArrowRightCircle>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default NewFilms;
