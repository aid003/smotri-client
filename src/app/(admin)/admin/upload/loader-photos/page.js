"use client";
import HeaderService from "@/components/headerService/HeaderService";
import { useAccessValidator } from "@/hooks/useAccessValidator";
import { customFetch } from "@/middleware/customFetch";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const [photosFiles, setPhotosFiles] = useState([]);
  const [titles, setTitles] = useState([]);
  const [selectedTitle, setSelectedTitle] = useState(null);

  const router = useRouter();
  const access = useAccessValidator(router);

  const changePickedTitleHandler = ({ target }) => {
    setSelectedTitle(target.value);
  };

  const uploadVideoHandler = (e) => {
    e.preventDefault();
    setPhotosFiles(e.target.files[0]);
  };

  const uploadHandler = async (e) => {
    e.preventDefault();

    if (!photosFiles) {
      alert("Файл не выбран, выберите файл!");
      return;
    }
    const formData = new FormData();
    formData.append("file", photosFiles);
    formData.append("information", JSON.stringify({ title: selectedTitle }));

    await customFetch(
      `${process.env.NEXT_PUBLIC_SERVER_PATH}upload-more-photos/`,
      {
        method: "POST",
        body: formData,
      }
    ).then((res) => {
      res.status === 201 ? alert("loaded") : alert("film not loaded");
    });
    router.push("/admin/service/");
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
    <div>
      <HeaderService />
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
      <form encType="multipart/form-data">
        <input
          type="file"
          accept=".png, .jpg, .heic, .web, .tif, .psd, .webp"
          name="file"
          onChange={uploadVideoHandler}
        />
        <button onClick={uploadHandler}>upload</button>
      </form>
    </div>
  );
};

export default Page;
