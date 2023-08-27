"use client";
import Image from "next/image";
import settingsIcon from "../../../public/svg/settings-svgrepo-com.svg";
import { RiArrowRightSLine } from "react-icons/ri";
import styles from "./videoPlayer.module.css";
import { useCallback, useState } from "react";
import ContentModal from "./ContentModal";

const Settings = ({ props }) => {
  const { filmsQuality, setIsModalMode, setContent, changeFilmQualityHandler } =
    props;

  const backHandler = () => {
    setIsModalMode(false);
    setContent(null);
  };

  const showElementHandler = () => {
    setIsModalMode(true);
    setContent(
      <div>
        <p onClick={backHandler}>Settings</p>
        {filmsQuality.map((el) => (
          <p
            key={el.id}
            onClick={() => {
                changeFilmQualityHandler(el.quality);
                console.log(el.quality)
            }}
          >
            {el.quality}
          </p>
        ))}
      </div>
    );
  };

  return (
    <>
      <div className={styles.qualityListItem} onClick={showElementHandler}>
        <div className={styles.itemsGroup}>
          <Image
            alt=""
            width={30}
            height={30}
            src={settingsIcon}
            className={styles.iconItemBase}
          />
          <p>Качество</p>
        </div>
        <RiArrowRightSLine className={styles.iconMenu}></RiArrowRightSLine>
      </div>
    </>
  );
};

export default Settings;
