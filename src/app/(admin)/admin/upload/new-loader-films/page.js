"use client";

import { customFetch } from "@/middleware/customFetch";
import { useEffect, useState } from "react";

const Page = () => {
  const [titles, setTitles] = useState([]);
  const [quality, setQuality] = useState(null);
  const [voiceActing, setVoiceActing] = useState(null);
  const [selectedTitle, setSelectedTitle] = useState(null);
  const [videoFile, setVideoFile] = useState(null);

  useEffect(() => {
    async function getTitles() {
      const response = await customFetch(
        `${process.env.NEXT_PUBLIC_SERVER_PATH}get-titles/`
      );
      setTitles(response.data);
    }
    getTitles();
  }, []);

  const changePickedTitleHandler = ({ target }) => {
    setSelectedTitle(target.value);
  };

  const inputQualityHandler = ({ target }) => {
    setQuality(target.value);
  };

  const inputVoiceActingHandler = ({ target }) => {
    setVoiceActing(target.value);
  };

  const uploadVideoHandler = (e) => {
    e.preventDefault();
    setVideoFile(e.target.files[0]);
  };

  const uploadHandler = async (e) => {
    e.preventDefault();
    setQuality((prev) => ({ ...prev }));
    setSelectedTitle((prev) => ({ ...prev }));

    if (!videoFile) {
      alert("Файл не выбран, выберите файл!");
      return;
    }
    const formData = new FormData();
    formData.append("file", videoFile);
    formData.append("information", JSON.stringify({ title: selectedTitle, quality: quality, voiceActing: voiceActing }));

    console.log(formData);

    // process.env.UPLOAD_PATH

    await customFetch(`${process.env.NEXT_PUBLIC_SERVER_PATH}new/`, {
      method: "POST",
      body: formData,
    }).then((res) => {
      res.status === 201 ? alert("loaded") : alert("film not loaded");
    });
  };

  return (
    <div>
      <select onChange={changePickedTitleHandler}>
        <option value={null}>Выберите фильм</option>
        {titles.map((el) => (
          <option
            value={el.title}
            key={el.title}
            onClick={(e) => {
              e.preventDefault();
              filmTitlePicker(el.title);
            }}
          >
            {el.title}
          </option>
        ))}
      </select>
      <input
        onChange={inputQualityHandler}
        placeholder="input quality video"
        required
      />
      <input
        onChange={inputVoiceActingHandler}
        placeholder="input VoiceActing"
        required
      />
      <form encType="multipart/form-data">
        <input
          type="file"
          accept=".mp4"
          name="file"
          onChange={uploadVideoHandler}
        />
        <button onClick={uploadHandler}>upload</button>
      </form>
    </div>
  );
};

export default Page;
