"use client";
import Image from "next/image";
import styles from "./filmItem.module.css";
import { useState } from "react";
import img from '../../../public/loaders/default.png'
import { useRouter } from "next/navigation";

const FilmsItem = (data) => {
  const values = data.data;

  const [isHover, setIsHower] = useState(false);
  const [poster, setPoster] = useState('')

  const router = useRouter()


  const progress = {
    background: "#333",
    borderRadius: "13px",
    height: "7px",
    width: "120px",
    marginTop: "3px",
    padding: "4px",
  };

  const status = {
    content: "",
    display: "block",
    background: "rgb(47, 47, 184)",
    width: `${values.ratingFilm * 10}%`,
    height: "100%",
    borderRadius: "9px",
  };

  // if (values.postersUrl === 'psYrl') {
  //   setPoster(img)
  // } else {
  //   setPoster(`${process.env.NEXT_PUBLIC_BASE_PHOTO_URL}/${values.postersUrl}`);
  // }

  const changeHoverStateOn = () => {
    setIsHower(true);
  };

  const changeHoverStateOff = () => {
    setIsHower(false);
  };

  const clickHandler = () => {
    router.push(`/film/${values.title}`)
  }

  return (
    <>
      <div
        className={styles.filmContainer}
        onMouseEnter={changeHoverStateOn}
        onMouseLeave={changeHoverStateOff}
        onClick={clickHandler}
      >
        <div className={styles.imgContainer}>
          <Image
            width={155}
            height={235}
            alt=""
            placeholder="blur"
            loading="lazy"
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
          <div style={progress}>
            <div style={status}></div>
          </div>
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
