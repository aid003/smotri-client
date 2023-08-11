"use client";

import { customFetch } from "@/middleware/customFetch";
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
  novelty: "ede",
  preview: "deed",
  TitleSeo: "defaulValue",
  DescriptionSeo: "defaulValue",
};

const initialState = { values: initialValues };

const Page = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [state, setState] = useState(initialState);

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

    await customFetch(
      `${process.env.NEXT_PUBLIC_SERVER_PATH}test-create-entry/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(values),
      }
    ).then((res) => {
      res.status === 201
        ? alert("Film entry was loaded")
        : alert("Error in loaded entry!");
    });
  };
  return (
    <div>
      <form>
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
          name="novelty"
          placeholder="novelty"
          onChange={updateVideoInfoHandler}
        ></input>
        <input
          type="text"
          name="preview"
          placeholder="preview"
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
    </div>
  );
};

export default Page;
