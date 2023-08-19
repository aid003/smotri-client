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
          {short ? "more" : "hide"}
        </div>
      </div>
    </>
  );
};

export default Content;
