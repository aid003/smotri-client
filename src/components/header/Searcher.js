"use client";
import { ValidateSearch } from "@/middleware/validateSearch";
import { useState } from "react";

const Searcher = () => {
  const [value, setValue] = useState("");
  const [resultSearch, setResultSearch] = useState([])

  const inputHandler = ({ target }) => {
    setValue(target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const data = await ValidateSearch(value);
    setResultSearch(data)
  };

  return (
    <div>
      <form>
        <input onChange={inputHandler}></input>
        <button onClick={submitHandler}>ok</button>
      </form>
    </div>
  );
};

export default Searcher;
