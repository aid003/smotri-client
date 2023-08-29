"use client";
import { useState } from "react";
import styles from "./content.module.css";

const Content = ({ props }) => {
  const [short, setShort] = useState(true);

  const moreHandler = (e) => {
    e.preventDefault();
    setShort(!short);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.contentContainer}>
          <p className={short ? styles.content : styles.contentShow}>{props}</p>
          {short && <span className={styles.cloud}></span>}
        </div>
        <div className={styles.more} onClick={moreHandler}>
          {short ? "Детали о фильме" : "Свернуть детали"}
        </div>
        <a className={styles.watchButton} href="#video-player">
          Смотреть
        </a>
      </div>
    </>
  );
};

export default Content;
