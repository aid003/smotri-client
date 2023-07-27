"use client";
import { customFetch } from "@/middleware/customFetch";
import { useEffect, useState } from "react";

const Page = () => {
  const [titles, setTitles] = useState([]);
  const [fields, setFields] = useState([]);
  const [pickedTitle, setPickedTitle] = useState();
    const [pickedField, setPickedField] = useState();
    
    const [value, setValue] = useState('')

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

  const filmTitlePicker = (title) => {
    setPickedTitle(title);
  };
    
    const updateValueHandler = () => {}

  return (
    <div>
      <select>
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
      <select>
        {fields.map((el) => (
          <option
            value={el}
            key={el}
            onClick={(e) => {
                e.preventDefault();
                setPickedField(el)
            }}
          >
            {el}
          </option>
        ))}
          </select>
          <input type="text" onChange={updateValueHandler}></input>
    </div>
  );
};

export default Page;
