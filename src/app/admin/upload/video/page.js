"use client";

import { useState } from "react";

const Page = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleChange = (e) => {
    console.log(e.target.value);
    setSelectedFile(e.target.value);
  };

  const handleUpload = async () => {
    console.log(selectedFile);
    if (!selectedFile) {
      alert("Файл не выбран, выберите файл!");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    const res = await fetch(process.env.UPLOAD_PATH, {
      method: "POST",
      body: formData,
    });
  };

  return (
    <div>
      <input type="file" accept=".mp4" onChange={handleChange}></input>
      <input type="submit" onClick={handleUpload}></input>
    </div>
  );
};

export default Page;
