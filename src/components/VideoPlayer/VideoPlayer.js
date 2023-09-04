"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./videoPlayer.module.css";
import Image from "next/image";

import playIcon from "../../../public/svg/play-svgrepo-com.svg";
import pauseIcon from "../../../public/svg/pause-svgrepo-com.svg";
import soundOffIcon from "../../../public/svg/sound-off-svgrepo-com.svg";
import sound1Icon from "../../../public/svg/sound-volume-1-svgrepo-com.svg";
import sound2Icon from "../../../public/svg/sound-volume-2-svgrepo-com.svg";
import settingsIcon from "../../../public/svg/settings-svgrepo-com.svg";
import fullscreenIcon from "../../../public/svg/fullscreen-svgrepo-com.svg";
import exitFullscreenIcon from "../../../public/svg/quit-full-screen-svgrepo-com.svg";
import ContentMenu from "./ContentMenu";
import Video from "./Video";

const VideoPlayer = ({ props }) => {
  const { filmsQuality, title } = props;

  const [isLoadingQuality, setIsLoadingQuality] = useState(true);
  const [currentQuality, setCurrentQuality] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isActiveSettingMenu, setIsActivesettingMenu] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);
  const [isShowControls, setIsShowControls] = useState(true);

  const videoRef = useRef(null);
  const videoContainerRef = useRef(null);

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    setCurrentQuality(filmsQuality[0].quality);
    setIsLoadingQuality(false);
  }, [filmsQuality]);

  const playHandler = async () => {
    videoRef.current.play();
    setIsPlaying(true);
    setIsActivesettingMenu(false);
    setIsShowControls(false);
  };

  const pauseHandler = () => {
    videoRef.current.pause();
    setIsPlaying(false);
    setIsShowControls(true);
  };

  const volumeChangeHandler = (e) => {
    setVolume(e.target.value);
    videoRef.current.volume = volume;
  };

  const settingsMenuHandler = () => {
    setIsActivesettingMenu(!isActiveSettingMenu);
  };

  const fullScreenHandler = () => {
    videoContainerRef.current.requestFullscreen();
    setFullScreen(true);
  };

  const exitFullScreenHandler = () => {
    document.exitFullscreen();
    setFullScreen(false);
    pauseHandler();
  };

  const changeFilmQualityHandler = (quality) => {
    setCurrentQuality(quality);
    pauseHandler();
  };

  // const playInHiddenControlsHandler = () => {
  //   pauseHandler();
  // };

  return (
    <div className={styles.container}>
      {!isLoadingQuality && (
        <div className={styles.videoPlayer} ref={videoContainerRef}>
          {currentQuality && (
            <Video
              props={{
                videoRef: videoRef,
                currentQuality: currentQuality,
                title: title,
                fullScreen: fullScreen,
              }}
            />
          )}
          <div
            id="video-player"
            onClick={() => {
              pauseHandler();
              setIsShowControls(true);
            }}
            className={styles.hiddenLayout}
          ></div>
          {isShowControls ? (
            <div className={styles.controlsTop}>
              <h3 className={styles.headingTitleVideo}>{title}</h3>
            </div>
          ) : (
            ""
          )}
          {isActiveSettingMenu && (
            <div
              className={styles.modalWindow}
              onMouseLeave={settingsMenuHandler}
            >
              <ContentMenu
                props={{
                  filmsQuality: filmsQuality,
                  changeFilmQualityHandler,
                }}
              />
            </div>
          )}
          {isShowControls ? (
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
                  style={{marginRight: "1%"}}
                  className={styles.iconItemBase}
                  onMouseEnter={settingsMenuHandler}
                  onClick={settingsMenuHandler}
                />
                {!fullScreen ? (
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
                ) : (
                  <Image
                    alt=""
                    width={30}
                    height={30}
                    src={exitFullscreenIcon}
                    className={styles.iconItemBase}
                    onClick={exitFullScreenHandler}
                  />
                )}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
