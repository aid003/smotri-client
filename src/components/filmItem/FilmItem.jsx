"use client";
import Image from "next/image";
import styles from "./filmItem.module.css";
import { useState } from "react";

const FilmsItem = (data) => {
  const values = data.data;

  const [isHover, setIsHower] = useState(false);

  const changeHoverStateOn = () => {
    setIsHower(true);
  };

  const changeHoverStateOff = () => {
    setIsHower(false);
  };

  return (
    <>
      <div
        className={styles.filmContainer}
        onMouseEnter={changeHoverStateOn}
        onMouseLeave={changeHoverStateOff}
      >
        <div className={styles.imgContainer}>
          <Image
            width={155}
            height={235}
            alt=""
            placeholder="blur"
            blurDataURL="../../../public/loaders/1614642076_36-p-sinii-fon-dlya-fotoshopa-odnotonnii-42.png"
            src={`${process.env.NEXT_PUBLIC_BASE_PHOTO_URL}/${values.postersUrl}`}
            className={isHover ? styles.imgScale : styles.img}
          ></Image>
        </div>
        <div
          className={
            isHover
              ? styles.hoverContentContainer
              : styles.hoverContentContainerHidden
          }
        >
          <p className={styles.rating}>{values.ratingFilm}</p>
          <p className={styles.yearCreate}>
            {values.yearCreate}, {values.countries}
          </p>
          <p className={styles.gendre}>{values.gendre}</p>
        </div>
        <h3 className={styles.heading}>{values.title}</h3>
      </div>
    </>
  );
};

export default FilmsItem;
