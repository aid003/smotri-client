"use client";
import { useState } from "react";
import styles from "./content.module.css";

const Content = ({ children }) => {
  const [short, setShort] = useState(false);
    
  const moreHandler = (e) => {
    e.preventDefault();
    setShort(!short);
  };
    
  return (
    <div className={styles.container}>
      <p style={shortStyle} >{children}</p>
      <button onClick={moreHandler}>more</button>
    </div>
  );
};

export default Content;
