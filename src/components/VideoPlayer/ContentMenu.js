"use client";

import { useState } from "react";
import Settings from "./Settings";
import ContentModal from "./ContentModal";

const ContentMenu = ({ props }) => {
  const [isModalMode, setIsModalMode] =
    useState(false);
  const [Content, setContent] = useState(null);
  const { filmsQuality, changeFilmQualityHandler } = props;
  return (
    <div>
      {isModalMode && <ContentModal>{Content}</ContentModal>}
      {!isModalMode && (
        <Settings
          props={{
            filmsQuality: filmsQuality,
            setIsModalMode: setIsModalMode,
            changeFilmQualityHandler,
            setContent: setContent,
          }}
        />
      )}
    </div>
  );
};

export default ContentMenu;
