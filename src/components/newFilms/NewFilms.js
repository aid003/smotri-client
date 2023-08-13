"use client";
import styles from "./newFilms.module.css";
import FilmsItem from "../filmItem/FilmItem";
import { getData } from "./GetData";
import { useEffect, useRef, useState } from "react";
import { BsArrowRightCircle } from "react-icons/bs";
import { BsArrowLeftCircle } from "react-icons/bs";

const NewFilms = () => {
  const [films, setFilms] = useState([]);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [isButtonClick, setIsButtonClick] = useState(false);

  const listRef = useRef(null);

  useEffect(() => {
    async function get() {
      await getData().then((req) => {
        setFilms(req);
      });
    }
    get();
  }, []);

  useEffect(() => {
    const { current } = listRef;
    setCanScrollLeft(current.scrollLeft > 0);
    setIsButtonClick(false)
  }, [isButtonClick]);

  const getWidthBlock = (blockRef) => {
    const { width } = blockRef.current.getBoundingClientRect();
    return Math.round(width);
  };

  const scrollByContainer = (distance) => {
    listRef.current?.scrollBy({ left: distance, behavior: "smooth" });
    setIsButtonClick(true);
    const { current } = listRef;
    console.log(current.scrollLeft)
  };

  return (
    <div>
      <h3 className={styles.heading}>New films</h3>
      <div className={styles.filmsContainer} ref={listRef}>
        {films.map((film) => (
          <FilmsItem key={film.id} data={film}></FilmsItem>
        ))}
        <div
          onClick={() => {
            scrollByContainer(getWidthBlock(listRef) - 180);
          }}
          className={styles.next}
        >
          <BsArrowRightCircle></BsArrowRightCircle>
        </div>
        {canScrollLeft ? (
          <div
            onClick={() => {
              scrollByContainer(-getWidthBlock(listRef) - 180);
            }}
            className={styles.back}
          >
            <BsArrowLeftCircle></BsArrowLeftCircle>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default NewFilms;
