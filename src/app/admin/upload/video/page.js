"use client";

import { useState } from "react";

const initialValues = {
  title: "defaulValue",
  ratingFilm: "0",
  postersUrl: "psYrl",
  yearCreate: "0",
  countries: "defaulValue",
  gendre: "defaulValue",
  content: "defaulValue",
  ageRestriction: "0",
  description: "defaulValue",
  actors: "defaulValue",
  TitleSeo: "defaulValue",
  DescriptionSeo: "defaulValue",
};

const initialState = { values: initialValues };

const Page = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [state, setState] = useState(initialState);

  const handleChange = (e) => {
    e.preventDefault();
    console.log(e.target.files[0]);
    setSelectedFile(e.target.files[0]);
  };

  const { values } = state;

  const updateVideoInfoHandler = ({ target }) => {
    setState((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        [target.name]: target.value,
      },
    }));

    console.log(values);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setState((prev) => ({ ...prev }));
    if (!selectedFile) {
      alert("Файл не выбран, выберите файл!");
      return;
    }
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("information", JSON.stringify(values));

    console.log(formData);

    // process.env.UPLOAD_PATH

    const res = await fetch("http://localhost:5005/api/upload-video-file", {
      method: "POST",
      body: formData,
    }).then((res) => {
      res.status === 201 ? alert("loaded") : alert("film not loaded");
      res.json();
    });
  };

  return (
    <>
      <form encType="multipart/form-data">
        <input
          type="file"
          accept=".mp4"
          name="file"
          onChange={handleChange}
        ></input>
        <input
          type="text"
          name="title"
          placeholder="title"
          onChange={updateVideoInfoHandler}
        ></input>
        <input
          type="number"
          name="ratingFilm"
          placeholder="ratingFilm"
          onChange={updateVideoInfoHandler}
        ></input>
        <input
          type="number"
          name="yearCreate"
          placeholder="yearCreate"
          onChange={updateVideoInfoHandler}
        ></input>
        <input
          type="text"
          name="countries"
          placeholder="countries"
          onChange={updateVideoInfoHandler}
        ></input>
        <input
          type="text"
          name="gendre"
          placeholder="gendre"
          onChange={updateVideoInfoHandler}
        ></input>
        <input
          type="text"
          name="content"
          placeholder="content"
          onChange={updateVideoInfoHandler}
        ></input>
        <input
          type="number"
          name="ageRestriction"
          placeholder="ageRestriction"
          onChange={updateVideoInfoHandler}
        ></input>
        <input
          type="text"
          name="description"
          placeholder="description"
          onChange={updateVideoInfoHandler}
        ></input>
        <input
          type="text"
          name="actors"
          placeholder="actors"
          onChange={updateVideoInfoHandler}
        ></input>
        <input
          type="text"
          name="TitleSeo"
          placeholder="TitleSeo"
          onChange={updateVideoInfoHandler}
        ></input>
        <input
          type="text"
          name="DescriptionSeo"
          placeholder="DescriptionSeo"
          onChange={updateVideoInfoHandler}
        ></input>
        <input type="submit" onClick={handleUpload}></input>
      </form>
      <video width={600} controls>
        <source src="http://localhost:5005/films/?title=taivan"></source>
      </video>
    </>
  );
};

export default Page;
