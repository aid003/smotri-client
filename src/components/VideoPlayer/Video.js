"use client";

import styles from "./videoPlayer.module.css";

const Video = ({ props }) => {
  const { videoRef, currentQuality, title, fullScreen} = props;

  return (
    <>
      <video
        className={styles.videoItem}
        ref={videoRef}
        src={`${process.env.NEXT_PUBLIC_BASIC_PATH}films/?title=${title}&quality=${currentQuality}`}
      />
    </>
  );
};

export default Video;
