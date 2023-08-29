"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import fullScreenImg from "../../../public/svg/fullscreen-svgrepo-com.svg";
import offVolumeImg from "../../../public/svg/sound-off-svgrepo-com.svg";
import onVolumeImg from "../../../public/svg/sound-volume-2-svgrepo-com.svg";
import exitFullscreenIcon from "../../../public/svg/quit-full-screen-svgrepo-com.svg";
import styles from "./previewPlaeer.module.css";

const PreviewPlayer = (film) => {
  const [onSound, setOnSound] = useState(true);
  const [fullScreen, setFullScreen] = useState(false);

  const videoRef = useRef(null);
  const videoContainerRef = useRef(null);

  const fullScreenHandler = () => {
    videoContainerRef.current.requestFullscreen();
    setFullScreen(true);
  };

  const exitFullScreenHandler = () => {
    document.exitFullscreen();
    setFullScreen(false);
  };

  const mutedHandler = () => {
    setOnSound(!onSound);
    onSound
      ? (videoRef.current.muted = false)
      : (videoRef.current.muted = true);
  };

  useEffect(() => {
    videoRef.current.muted = true;
    videoRef.current.play();
  }, []);

  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    const position = window.scrollY;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (scrollPosition >= 280) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
  }, [scrollPosition]);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.videoPlayer} ref={videoContainerRef}>
          <video ref={videoRef} loop={true}>
            <source
              src={`${process.env.NEXT_PUBLIC_BASIC_PATH}film/preview/?preview=${film.film}`}
            ></source>
          </video>
          <div className={styles.controls}>
            {fullScreen ? (
              <Image
                className={styles.controlsIcon}
                alt=""
                onClick={exitFullScreenHandler}
                width={30}
                height={30}
                src={exitFullscreenIcon}
              />
            ) : (
              <Image
                className={styles.controlsIcon}
                alt=""
                onClick={fullScreenHandler}
                width={30}
                height={30}
                src={fullScreenImg}
              />
            )}
            {onSound ? (
              <Image
                className={styles.controlsIcon}
                alt=""
                width={30}
                height={30}
                onClick={mutedHandler}
                src={offVolumeImg}
              />
            ) : (
              <Image
                className={styles.controlsIcon}
                alt=""
                width={30}
                height={30}
                onClick={mutedHandler}
                src={onVolumeImg}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PreviewPlayer;
