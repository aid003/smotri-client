"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import fullScreenImg from "../../../public/svg/fullscreen-svgrepo-com.svg";
import offVolumeImg from "../../../public/svg/sound-off-svgrepo-com.svg";
import onVolumeImg from "../../../public/svg/sound-volume-2-svgrepo-com.svg";
import styles from "./previewPlaeer.module.css";

const PreviewPlayer = () => {
  const [onSound, setOnSound] = useState(true);
  const [fullScreen, setFullScreen] = useState(false);

  const videoRef = useRef(null);

  const fullScreenHandler = () => {
    setFullScreen(true);
    setFullScreen((prev) => ({ ...prev }));
    fullScreen && videoRef.current.requestFullscreen();
  };

  useEffect(() => {
    videoRef.current.muted = true;
    videoRef.current.play();
  }, []);

  return (
    <>
      <video className="video" width={600} ref={videoRef}>
        <source
          src={`${process.env.NEXT_PUBLIC_BASIC_PATH}films/?title=qwerty&quality=430`}
        ></source>
      </video>
      <div className="controlsContainer">
        <div className="controls">
          <Image
            className={styles.controlsIcon}
            alt=""
            onClick={fullScreenHandler}
            width={30}
            height={30}
            src={fullScreenImg}
          />
          {onSound ? (
            <Image
              className={styles.controlsIcon}
              alt=""
              width={30}
              height={30}
              src={onVolumeImg}
            />
          ) : (
            <Image
              className={styles.controlsIcon}
              alt=""
              width={30}
              height={30}
              src={offVolumeImg}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default PreviewPlayer;
