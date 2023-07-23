"use client";
import { useEffect, useState } from "react";

const Page = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFilm, setSelectedFilm] = useState(null);
  const [titles, setTitles] = useState([]);

  const handleChange = (e) => {
    e.preventDefault();
    console.log(e.target.files[0]);
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile | !selectedFilm) {
      alert("Фото не выбрано | Фильм не выбран. Определись что хочешь!");
      return;
    }
    const formData = new FormData();
    formData.append("avatar", selectedFile);
    formData.append("filmTitle", JSON.stringify(selectedFilm));
    console.log(formData);

    // process.env.UPLOAD_PATH

    const res = await fetch(
      "http://localhost:5005/api/upload-avatar-for-video/",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    console.log(data);
  };

  const filmTitlePicker = (value) => {
    setSelectedFilm({ value });
  };

  useEffect(() => {
    async function getTitles() {
      const response = await fetch("http://localhost:5005/api/get-titles/");
      const data = await response.json();
      setTitles(data);
    }
    getTitles();
  }, []);

  return (
    <>
      <form encType="multipart/form-data">
        <input
          type="file"
          accept=".png, .jpg, .heic, .web, .tif, .psd"
          name="avatar"
          onChange={handleChange}
        />
        <input type="submit" onClick={handleUpload} />
        <div>
          {titles.map((el) => (
            <p
              value={el.title}
              key={el.title}
              onClick={(e) => {
                e.preventDefault();
                filmTitlePicker(el.title);
              }}
            >
              {el.title}
            </p>
          ))}
        </div>
      </form>
    </>
  );
};

export default Page;