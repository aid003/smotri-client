"use client";

import styles from "./videoPlayer.module.css";

const Video = ({ props }) => {
  const { videoRef, currentQuality, title, fullScreen} = props;

    console.log(fullScreen)

  return (
    <>
      <video
        className={styles.videoItem}
        ref={videoRef}
        src={`${process.env.NEXT_PUBLIC_BASIC_PATH}films/?title=${title}&quality=${currentQuality}`}
      />
      {fullScreen && <div className={styles.fullScreenControls}>xcvb</div>}
    </>
  );
};

export default Video;
