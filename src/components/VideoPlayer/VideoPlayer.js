"use client";

import { customFetch } from "@/middleware/customFetch";
import { useEffect, useState } from "react";

const VideoPlayer = ({ props }) => {
  const { filmsQuality } = props;

  console.log(filmsQuality);
  const [currentFilm, setCurrentFilm] = useState(null);

  return (
    <div>
      {/* <video>
        <source src={}></source>
      </video> */}
      frefefrr
    </div>
  );
};

export default VideoPlayer;
