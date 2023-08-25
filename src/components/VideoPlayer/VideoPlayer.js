"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./videoPlayer.module.css";
import Image from "next/image";

import { RiArrowRightSLine } from "react-icons/ri";


import playIcon from "../../../public/svg/play-svgrepo-com.svg";
import pauseIcon from "../../../public/svg/pause-svgrepo-com.svg";
import soundOffIcon from "../../../public/svg/sound-off-svgrepo-com.svg";
import sound1Icon from "../../../public/svg/sound-volume-1-svgrepo-com.svg";
import sound2Icon from "../../../public/svg/sound-volume-2-svgrepo-com.svg";
import settingsIcon from "../../../public/svg/settings-svgrepo-com.svg";
import fullscreenIcon from "../../../public/svg/fullscreen-svgrepo-com.svg";
import ContentMenu from "./ContentMenu";

const VideoPlayer = ({ props }) => {
  const { filmsQuality, title } = props;

  const [isLoadingQuality, setIsLoadingQuality] = useState(true);
  const [currentQuality, setCurrentQuality] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isActiveSettingMenu, setIsActivesettingMenu] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);

  const videoRef = useRef(null);

  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  useEffect(() => {
    setCurrentQuality(filmsQuality[filmsQuality.length - 1].quality);
    setIsLoadingQuality(false);
  }, [filmsQuality]);

  const playHandler = () => {
    videoRef.current.play();
    setIsPlaying(true);
    setIsActivesettingMenu(false);
  };

  const pauseHandler = () => {
    videoRef.current.pause();
    setIsPlaying(false);
  };

  const volumeChangeHandler = (e) => {
    setVolume(e.target.value);
    videoRef.current.volume = volume;
  };

  const settingsMenuHandler = () => {
    setIsActivesettingMenu(!isActiveSettingMenu);
  };

  const fullScreenHandler = () => {
    setFullScreen(true);
    videoRef.current.requestFullscreen();
  };

  const changeFilmQualityHandler = (quality) => {
    setCurrentQuality(quality);
    forceUpdate();
  };

  return (
    <div className={styles.container}>
      {!isLoadingQuality && (
        <div className={styles.videoPlayer}>
          {currentQuality && (
            <video ref={videoRef}>
              <source
                src={`${process.env.NEXT_PUBLIC_BASIC_PATH}films/?title=${title}&quality=${currentQuality}`}
              ></source>
            </video>
          )}
          <div className={styles.controlsTop}></div>
          {isActiveSettingMenu && (
            <ul
              className={styles.modalWindow}
              onMouseLeave={settingsMenuHandler}
            >
              <ContentMenu>
                <li className={styles.qualityListItem}>
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
                  <RiArrowRightSLine
                    className={styles.iconMenu}
                  ></RiArrowRightSLine>
                </li>
                {filmsQuality.map((el) => (
                  <p
                    key={el.id}
                    onClick={() => {
                      changeFilmQualityHandler(el.quality);
                    }}
                  >
                    {el.quality}
                  </p>
                ))}
              </ContentMenu>
            </ul>
          )}
          <div className={styles.controlsBottom}>
            <div className={styles.controlsLeftBottom}>
              <div className={styles.playOrPauseHandler}>
                {isPlaying ? (
                  <Image
                    alt=""
                    width={30}
                    height={30}
                    src={pauseIcon}
                    className={styles.iconItemBase}
                    onClick={pauseHandler}
                  />
                ) : (
                  <Image
                    alt=""
                    width={30}
                    height={30}
                    src={playIcon}
                    className={styles.iconItemBase}
                    onClick={playHandler}
                  />
                )}
              </div>
              <div className={styles.volumeContainer}>
                {volume <= 0.02 ? (
                  <Image alt="" width={30} height={30} src={soundOffIcon} />
                ) : volume <= 0.4 ? (
                  <Image alt="" width={30} height={30} src={sound1Icon} />
                ) : (
                  <Image alt="" width={30} height={30} src={sound2Icon} />
                )}
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  onChange={volumeChangeHandler}
                />
              </div>
            </div>
            <div className={styles.controlsRightBottom}>
              <Image
                alt=""
                width={30}
                height={30}
                src={settingsIcon}
                className={styles.iconItemBase}
                onMouseEnter={settingsMenuHandler}
                onClick={settingsMenuHandler}
              />
              <Image
                alt=""
                width={30}
                height={30}
                src={fullscreenIcon}
                onClick={fullScreenHandler}
                onMouseEnter={() => {
                  setIsActivesettingMenu(false);
                }}
                className={styles.iconItemBase}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
