"use client";
import { useEffect, useState } from "react";
import { customFetch } from "../../../../../middleware/customFetch";
import { useRouter } from "next/navigation";
import HeaderService from "@/components/headerService/HeaderService";
import { useAccessValidator } from "@/hooks/useAccessValidator";

const Page = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedTitle, setSelectedTitle] = useState(null);
  const [titles, setTitles] = useState([]);

  const router = useRouter();
  const access = useAccessValidator(router);

  const handleChange = (e) => {
    e.preventDefault();
    console.log(e.target.files[0]);
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile | !selectedTitle) {
      alert("Фото не выбрано | Фильм не выбран. Определись что хочешь!");
      return;
    }
    const formData = new FormData();
    formData.append("avatar", selectedFile);
    formData.append("filmTitle", JSON.stringify({ value: selectedTitle }));
    console.log(formData);

    // process.env.UPLOAD_PATH

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_PATH}upload-avatar-for-video/`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    console.log(data);
  };


  const changePickedTitleHandler = ({ target }) => {
    setSelectedTitle(target.value);
  };

  useEffect(() => {
    async function getTitles() {
      const response = await customFetch(
        `${process.env.NEXT_PUBLIC_SERVER_PATH}get-titles/`
      );
      setTitles(response.data);
    }
    getTitles();
  }, []);

  return (
    <>
      <HeaderService />
      <form encType="multipart/form-data">
        <select onChange={changePickedTitleHandler}>
          <option value={null}>Выберите фильм</option>
          {titles.map((el) => (
            <option
              value={el.title}
              key={el.title}
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              {el.title}
            </option>
          ))}
        </select>
        <input
          type="file"
          accept=".png, .jpg, .heic, .web, .tif, .psd"
          name="avatar"
          onChange={handleChange}
        />
        <input type="submit" onClick={handleUpload} />
      </form>
    </>
  );
};

export default Page;
