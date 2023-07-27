"use client";
import { useState } from "react";
import { customFetch } from "../../../middleware/customFetch";
import { useRouter } from "next/navigation";

const actions = ["login", "register"];
const initialValues = {
  email: "",
  password: "",
  role: "",
};

const initialState = { values: initialValues };

const Page = () => {
  const [action, setAction] = useState(actions[0]);
  const [state, setState] = useState(initialState);

  const router = useRouter();

  const { values } = state;

  const changeActionHandler = (e) => {
    e.preventDefault();
    setAction(e.target.value);
  };

  const changeValueHandler = ({ target }) => {
    setState((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        [target.name]: target.value,
      },
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (action === actions[0]) {
      const data = await customFetch(
        "http://localhost:5005/api/login-user-with-login/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify(values),
        }
      );
      if (!data) return;

      localStorage.setItem("colorTheme", data.data.accessToken);

      if (data.data.role === "User") {
        alert("У вас недостаточно прав, обратитесь к администратору!");
        return;
      }
      router.push("/admin/service");
      console.log("success login");
      return;
    }

    if (action === actions[1]) {
      const data = await customFetch(
        "http://localhost:5005/api/register-user/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify(values),
        }
      );
      localStorage.setItem("colorTheme", data.data.accessToken);
      console.log("success registration");
      return;
    }
  };

  return (
    <>
      <form>
        <div>
          <button onClick={changeActionHandler} value={actions[1]}>
            register
          </button>
          <button onClick={changeActionHandler} value={actions[0]}>
            login
          </button>
        </div>
        <input
          onChange={changeValueHandler}
          name="email"
          placeholder="Email"
          type="email"
        ></input>
        <input
          onChange={changeValueHandler}
          name="password"
          placeholder="Password"
          type="text"
        ></input>
        <div>
          <button onClick={submitHandler}>Enter</button>
        </div>
      </form>
    </>
  );
};

export default Page;
