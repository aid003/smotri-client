"use client";

import Image from "next/image";

const FilmsItem = (data) => {
  const values = data.data;

  return (
    <>
      <div className={styles.filmContainer}>
        <div className={styles.imgContainer}>
          <Image width={155} alt="" src={}></Image>
        </div>
        <h3>{values.title}</h3>
      </div>
    </>
  );
};

export default FilmsItem;
