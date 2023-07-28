"use client";
import { customFetch } from "@/middleware/customFetch";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const [titles, setTitles] = useState([]);
  const [fields, setFields] = useState([]);
  const [pickedTitle, setPickedTitle] = useState();
  const [pickedField, setPickedField] = useState();

  const [currentData, setCurrentData] = useState();

  const [value, setValue] = useState("");

  const router = useRouter();

  useEffect(() => {
    async function validator() {
      const token = localStorage.getItem("colorTheme");
      if (!token) {
        router.push("/admin/login");
      }
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_PATH}login-user-with-token/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { isValidToken, role } = await response.json();

      if (!isValidToken) {
        router.push("/admin/login");
      }

      if (role === "User") {
        router.push("/admin/login");
      }
    }
    validator();
  }, [router]);

  useEffect(() => {
    async function getTitles() {
      const response = await customFetch(
        `${process.env.NEXT_PUBLIC_SERVER_PATH}get-titles/`
      );
      setTitles(response.data);
    }
    async function getFields() {
      const data = await customFetch(
        `${process.env.NEXT_PUBLIC_SERVER_PATH}get-all-feilds/`
      );
      setFields(data.data.data.split(","));
    }
    getTitles();
    getFields();
  }, []);

  const filmTitlePicker = ({ target }) => {
    setPickedTitle(target.value);
  };

  const filmFieldPicker = ({ target }) => {
    setPickedField(target.value);
  };

  const updateValueHandler = ({ target }) => {
    setValue(target.value);
  };

  const uploadHandler = async (e) => {
    if (!pickedField || !pickedTitle || !value) {
      alert(`Заполните все поля: ${pickedField} ${pickedTitle} ${value}`);
    }
    const entry = { title: pickedTitle, field: pickedField, value: value };
    const sendUpdate = await customFetch(
      `${process.env.NEXT_PUBLIC_SERVER_PATH}change-film-fields`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(entry),
      }
    );
    setCurrentData(JSON.stringify(sendUpdate.data));
  };

  return (
    <div>
      <select onChange={filmTitlePicker}>
        <option value={false}>Выберите фильм</option>
        {titles.map((el) => (
          <option value={el.title} key={el.title}>
            {el.title}
          </option>
        ))}
      </select>
      <select onChange={filmFieldPicker}>
        <option value={false}>Выберите поле</option>
        {fields.map((el) => (
          <option value={el} key={el}>
            {el}
          </option>
        ))}
      </select>
      <input type="text" onChange={updateValueHandler}></input>
      <button onClick={uploadHandler}>ok</button>
      <div>{currentData}</div>
    </div>
  );
};

export default Page;
